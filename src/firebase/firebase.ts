import config from '../firebaseConfig.json';
import app, { firestore, database } from 'firebase/app';
import React from 'react';
import { toInteger, merge } from 'lodash';
require('firebase/auth');
require('firebase/firestore');
require('firebase/database');
require('firebase/storage');

interface MessageRequest {
	name: string;
	content: string;
	reciever: string;
	recieverName: string;
	chatId: string;
}

export class Firebase {
	auth: app.auth.Auth;
	db: app.firestore.Firestore;
	rtdb: app.database.Database;
	storage: app.storage.Storage;

	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.firestore();
		this.rtdb = app.database();
		this.storage = app.storage();
	}

	createUserEntry = async (payload: any) => {
		const {
			uid,
			currentInstitute,
			universityId,
			university,
			type,
			name,
			email,
			gender,
			phone,
			country,
			isAmbassador,
			course,
		} = payload;
		const data = payload.isAmbassador.value
			? {
					universityId: universityId.value,
					type: type.value,
					university: university.value,
					course: course.value,
			  }
			: { currentInstitute: currentInstitute.value };
		await this.db
			.collection('USER')
			.doc(uid)
			.set({
				...{
					name: name.value,
					email: email.value,
					gender: gender.value,
					phone: phone.value,
					country: country.value,
					isAmbassador: isAmbassador.value,
					favouriteUnis: isAmbassador.value ? [universityId.value] : [],
				},
				data: data,
			});
	};

	doCreateUserWithEmailAndPassword = async (email: string, password: string) =>
		await this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = async (email: string, password: string) =>
		await this.auth.signInWithEmailAndPassword(email, password);

	getUser = async (email: string) =>
		await this.db.collection('USER').where('email', '==', email).get();

	doSignOut = async () => await this.auth.signOut();

	getVerifyId = async () => await this.auth.currentUser?.getIdToken();

	getPosts = async (after: string | null, faves: string[]): Promise<any[]> => {
		if (after === null) {
			return await this.db
				.collection('posts')
				.where('universityId', 'in', faves)
				.orderBy('createdAt', 'desc')
				.limit(10)
				.get()
				.then(query => {
					var data: any[] = [];
					query.docs.map((doc, i) => {
						data[i] = doc.data();
						data[i].id = doc.id;
						return data;
					});
					console.log('Fetched:', data);
					return data;
				});
		} else {
			console.log('Getting after:', after);
			return await this.db
				.collection('posts')
				.where('universityId', 'in', faves)
				.orderBy('createdAt', 'desc')
				.startAfter(after)
				.limit(10)
				.get()
				.then(query => {
					var data: any[] = [];
					query.docs.map((doc, i) => {
						data[i] = doc.data();
						data[i].id = doc.id;
						return data;
					});
					console.log('Appended:', data);
					return data;
				});
		}
	};

	getUniversities = async () => {
		return await this.db
			.collection('university')
			.get()
			.then(query => {
				var data: any[] = [];
				query.docs.map((doc, i) => {
					data[i] = doc.data();
					data[i].id = doc.id;
					return data;
				});
				return data;
			});
	};

	doPasswordReset = async (email: string) =>
		await this.auth.sendPasswordResetEmail(email);

	getProfileImageUrl = async (uid: string) => {
		return this.storage
			.ref(`profileImages/${uid}.jpg`)
			.getDownloadURL()
			.catch(err => {
				return '';
			});
	};

	editFavourites = async (
		uid: string,
		universityIds: string[],
		add?: boolean
	) => {
		//add:true -> add else remove from favouriteUnis
		if (add) {
			universityIds.map(id => {
				this.db
					.collection('USER')
					.doc(uid)
					.update({
						favouriteUnis: firestore.FieldValue.arrayUnion(id),
					});
				return id;
			});
		} else {
			universityIds.map(id => {
				this.db
					.collection('USER')
					.doc(uid)
					.update({
						favouriteUnis: firestore.FieldValue.arrayRemove(id),
					});
				return id;
			});
		}
	};

	signOut = async () => await this.auth.signOut();

	//posts

	like = async (post: string) =>
		await this.db
			.collection('post_likes')
			.add({ userId: this.auth.currentUser?.uid, postId: post });

	unlike = async (post: string) =>
		await this.db
			.collection('post_likes')
			.where('userId', '==', this.auth.currentUser?.uid)
			.where('postId', '==', post)
			.get()
			.then(async query => {
				if (query.docs[0] == undefined) return;
				await query.docs[0].ref.delete();
			});

	createPost = async (post: any) => {
		await this.db.collection('posts').add({
			...post,
			...{ createdAt: firestore.FieldValue.serverTimestamp() },
		});
	};

	deletePostImage = async (filename: string) => {
		this.storage.ref(`postImages/${filename}`).delete();
	};

	//chats

	//Get entries for ChatList
	getUserChats = async () => {
		return await this.rtdb
			.ref(`userChats/${this.auth.currentUser?.uid}`)
			.once('value')
			.then(snapshot => {
				var data: Array<any> = [];
				snapshot.forEach(child => {
					if (!child.exists()) return;
					data.push({ userId: child.key, ...child.val() });
				});
				return data;
			});
	};

	//Ref for listener in ChatList
	getUserChatsRef = () => {
		return this.rtdb.ref(`userChats/${this.auth.currentUser?.uid}`);
	};

	//get messages for chat
	getChat = async (chatId: string) => {
		return await this.rtdb
			.ref(`chats/${chatId}`)
			.once('value')
			.then(snapshot => {
				var data: Array<any> = [];
				snapshot.forEach(child => {
					data.push({ ...{ id: child.key }, ...child.val() });
				});
				console.log('Fetched chat', data);
				return data;
			});
	};

	//Ref for listener in Chat
	getChatRef = (chatId: string) => {
		return this.rtdb.ref(`chats/${chatId}`);
	};

	//send message. Payload defined in MessageRequest interface.
	sendMessage = async (messageRequest: MessageRequest) => {
		const { name, content, reciever, recieverName, chatId } = messageRequest;

		const key = (await this.rtdb.ref('chats/').push()).key;

		const newUserChatData = {
			chat: chatId,
			lastActive: database.ServerValue.TIMESTAMP,
			latest: content,
		};

		var updates: any = {};
		updates[`userChats/${this.auth.currentUser?.uid}/${reciever}`] = {
			...newUserChatData,
			name: recieverName,
		};

		updates[`userChats/${reciever}/${this.auth.currentUser?.uid}`] = {
			...newUserChatData,
			name: name,
		};

		updates[`chats/${chatId}/${key}`] = {
			content: content,
			sender: this.auth.currentUser?.uid,
			timestamp: database.ServerValue.TIMESTAMP,
		};

		await this.rtdb.ref().update(updates);
	};

	fetchUser = async (uid: string) => {
		return this.db
			.collection('USER')
			.doc(uid)
			.get()
			.then(user => {
				return user.data();
			});
	};

	updateUser = async (uid: string, fields: object) => {
		return this.db
			.collection('USER')
			.doc(uid)
			.set({ ...fields }, { merge: true });
	};
	fetchUserFromRtdb = async (uid: string) => {
		const data: any = {};
		await this.rtdb.ref(`USER/${uid}`).once('value', snapshot => {
			snapshot.forEach(child => {
				if (child.key === null) return;
				data[child.key] = child.val();
			});
		});
		return data;
	};

	getExperts = async () => {
		const data: any[] = [];
		const experts: any[] = [];
		await this.rtdb.ref('experts').once('value', snapshot => {
			snapshot.forEach(child => {
				if (child.key === null) return;
				experts.push({ id: child.key });
			});
		});
		experts.forEach(async expert => {
			data.push({ ...expert, ...(await this.fetchUserFromRtdb(expert.id)) });
		});
		console.log(data);
		return data;
	};

	getAmbassadors = async (id: string) => {
		const data: any[] = [];
		const ambassadors: any[] = [];
		await this.rtdb.ref(`ambassadors/${id}`).once('value', snapshot => {
			snapshot.forEach(child => {
				if (child.key === null) return;
				ambassadors.push({ id: child.key, type: child.val() });
			});
		});
		ambassadors.forEach(async amb => {
			data.push({ ...amb, ...(await this.fetchUserFromRtdb(amb.id)) });
		});
		console.log(data);
		return data;
	};

	getChatRoom = async (target: { name: string; id: string }) => {
		const data: any[] = [];
		await this.rtdb
			.ref(`userChats/${this.auth.currentUser?.uid}/${target.id}`)
			.once('value', async snapshot => {
				if (snapshot.exists()) {
					console.log('Getting');
					data.push({ userId: snapshot.key, ...snapshot.val() });
				} else {
					console.log('Setting');
					const key = (await this.rtdb.ref('chats').push()).key;
					const userChat = {
						chat: key,
						lastActive: database.ServerValue.TIMESTAMP,
						latest: '',
						name: target.name,
					};
					await this.rtdb
						.ref(`userChats/${this.auth.currentUser?.uid}/${target.id}`)
						.set(userChat);
					data.push({ ...userChat, userId: target.id });
				}
			});
		console.log('In firebase', data);
		return data[0];
	};
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
