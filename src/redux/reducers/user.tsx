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
			const {
				uid,
				displayName,
				phoneNumber,
				email,
				photoURL,
				emailVerified,
				isAnonymous,
			} = action.payload.user;
			return {
				...state,
				uid: uid,
				details: {
					name: displayName,
					phone: phoneNumber,
					email: email,
				},
				photoURL: photoURL,
				emailVerified: emailVerified,
				isAnonymous: isAnonymous,
			};
		}
		default:
			return state;
	}
};
