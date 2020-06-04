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
			return {
				...state,
				uid: uid,
				details: {
					name: name,
					email: email,
				},
				photoURL: profileImage,
				isAmbassador: isAmbassador,
			};
		}
		default:
			return state;
	}
};
