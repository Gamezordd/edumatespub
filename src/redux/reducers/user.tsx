import * as ActionTypes from '../ActionTypes';

export const User = (
	state = {
		uid: '',
		details: { name: '', phone: '', email: '' },
		photoURL: '',
		emailVerified: false,
		isAnonymous: false,
	},
	action: any
) => {
	switch (action.type) {
		case ActionTypes.EXAMPLE_ACTION:
			return { ...state };
		case ActionTypes.LOGIN_ACTION: {
			const { uid, name, email, profileImage, isAmbassador } = action.payload;
			console.log('Logging in');
			return {
				...state,
				uid: uid,
				details: {
					name: name,
					email: email,
				},
				isLoggedIn: true,
				photoURL: profileImage,
				isAmbassador: isAmbassador,
			};
		}
		case ActionTypes.LOGOUT_ACTION:
			return {
				...state,
				uid: '',
				isLoggedIn: false,
				photoURL: '',
				isAmbassador: false,
				details: {},
			};
		default:
			return state;
	}
};
