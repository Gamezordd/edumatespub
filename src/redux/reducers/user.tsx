import * as ActionTypes from '../ActionTypes';

export const User = (
	state = {
		uid: '',
		details: { name: '', phone: '', email: '' },
		photoURL: '',
		emailVerified: false,
		isAnonymous: false,
		favouriteUnis: new Array<string>(),
		userLikes: new Array<string>(),
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
				data,
			} = action.payload;
			console.log("uid: ", uid);
			
			return {
				...state,
				uid: uid,
				details: {
					name: name,
					email: email,
					universityId: isAmbassador ? data.universityId : '',
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
					return (stateUpdate = newFavourites);
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

		case ActionTypes.FETCH_LIKES: {
			return {
				...state,
				userLikes: action.likes,
			};
		}

		case ActionTypes.ADD_LIKE: {
			const newLikes = new Set(state.userLikes.concat(action.post));
			return { ...state, ...{ userLikes: Array.from(newLikes) } };
		}

		case ActionTypes.REMOVE_LIKE: {
			const index = state.userLikes.indexOf(action.post);
			const newLikes =
				index === -1 ? state.userLikes : state.userLikes.splice(index, 1);
			return {
				...state,
				...{ userLikes: newLikes },
			};
		}

		default:
			return state;
	}
};
