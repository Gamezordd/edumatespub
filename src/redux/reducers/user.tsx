import * as ActionTypes from '../ActionTypes';

export const User = (
	state = {
		uid: '',
		details: { name: '', phone: '', email: '' },
		photoURL: '',
		emailVerified: false,
		isAnonymous: false,
		favouriteUnis: [],
	},
	action: any
) => {
	switch (action.type) {
		case ActionTypes.EXAMPLE_ACTION:
			return { ...state };
		case ActionTypes.LOGIN_ACTION: {
			const {
				uid,
				name,
				email,
				profileImage,
				favouriteUnis,
				isAmbassador,
			} = action.payload;
			console.log("uid: ", uid);
			
			return {
				...state,
				uid: uid,
				details: {
					name: name,
					email: email,
				},
				isLoggedIn: true,
				favouriteUnis: favouriteUnis,
				photoURL: profileImage,
				isAmbassador: isAmbassador,
			};
		}

		case ActionTypes.EDIT_FAVOURITES: {
			var stateUpdate: string[] = [];
			const { ids, add } = action.payload;
			if (add) {
				stateUpdate = state.favouriteUnis.concat(ids);
			} else {
				var newFavourites = state.favouriteUnis;
				ids.map((favouriteid: string) => {
					newFavourites = newFavourites.filter(
						element => !(favouriteid === element)
					);
					return stateUpdate = newFavourites;
				});
			}
			console.log('stateUpdate: ', stateUpdate);

			return { ...state, favouriteUnis: stateUpdate };
		}

		case ActionTypes.LOGOUT_ACTION:
			return {
				...state,
				uid: '',
				isLoggedIn: false,
				photoURL: '',
				isAmbassador: false,
				favouriteUnis: [],
				details: {},
			};

		default:
			return state;
	}
};
