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
			type,
			name,
			email,
			gender,
			phone,
			country,
			isAmbassador,
		} = payload;
		const data = payload.isAmbassador.value
			? { universityId: universityId.value, type: type.value }
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

	async sendChat(message: string, fromUid: string, toUid: string) {
		const messagesListRef = this.rtdb.ref('Chats/');
		messagesListRef
			.push()
			.set({
				message: message,
				receiver: toUid,
				sender: fromUid,
				timestamp: toInteger(new Date().getTime() / 1000),
			})
			.then(async id => {
				console.log('sent: ', await id);
			});
	}

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
		return this.db.collection('USER').doc(uid).set({...fields}, {merge: true})
	}
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
