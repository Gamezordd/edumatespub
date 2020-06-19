import config from '../firebaseConfig.json';
import app, { firestore } from 'firebase/app';
import React from 'react';
import { getRoles } from '@testing-library/react';
require('firebase/auth');
require('firebase/firestore');
require('firebase/database');
require('firebase/storage');

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
				console.log('data: ', data);

				return data;
			});
	};

	doPasswordReset = async (email: string) =>
		await this.auth.sendPasswordResetEmail(email);

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
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
