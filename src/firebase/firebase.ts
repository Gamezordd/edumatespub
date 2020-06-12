import config from '../firebaseConfig.json';
import app from 'firebase/app';
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
		await this.db.collection('USER').add({
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

	getPosts = async (after: string | null, faves: string[]) => {
		if (after === null) {
			return await this.db
				.collection('posts')
				.where('universityId', 'in', faves)
				.orderBy('createdAt', 'desc')
				.limit(10)
				.get();
		} else {
			return await this.db
				.collection('posts')
				.where('universityId', 'in', faves)
				.orderBy('createdAt', 'desc')
				.startAfter(after)
				.limit(10)
				.get();
		}
	};

	getUniversities = async () =>
		await this.db
			.collection('university')
			.get()
			.then(query => {
				var data: any[];
				query.docs.map((doc, i) => {
					data[i] = doc.data();
					data[i].id = doc.id;
					return data;
				});
			});

	doPasswordReset = async (email: string) =>
		await this.auth.sendPasswordResetEmail(email);
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
