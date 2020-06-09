import * as ActionTypes from './ActionTypes';

export const exampleAction = () => ({
	type: ActionTypes.EXAMPLE_ACTION,
});

export const loginAction = (payload: object) => ({
	type: ActionTypes.LOGIN_ACTION,
	payload: payload,
});

export const logoutAction = () => ({
	type: ActionTypes.LOGOUT_ACTION,
});

export const editFavouritesAction = (payload: string[], add?: boolean) => ({
	//add:true -> add else remove from favouriteUnis
	type: ActionTypes.EDIT_FAVOURITES,
	payload: payload,
	add: add,
});
