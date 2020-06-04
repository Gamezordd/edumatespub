import config from '../firebaseConfig.json';
import app from 'firebase/app';
import React from 'react';
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

	doCreateUserWithEmailAndPassword = async (email: string, password: string) =>
		await this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = async (email: string, password: string) =>
		await this.auth.signInWithEmailAndPassword(email, password);

	getUser = async (email: string) =>
		await this.db.collection('USERS').where('email', '==', email).get();

	doSignOut = async () => await this.auth.signOut();

	doPasswordReset = async (email: string) =>
		await this.auth.sendPasswordResetEmail(email);
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
