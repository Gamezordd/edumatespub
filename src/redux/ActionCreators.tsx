import * as ActionTypes from './ActionTypes';

//interfaces

interface FetchInitialPosts {
	type: ActionTypes.FETCH_INITIAL_POSTS;
	posts: any[];
	lastFetched: string;
}

interface AppendPosts {
	type: ActionTypes.APPEND_POSTS;
	posts: any[];
	lastFetched: string;
}

interface FetchLikes {
	type: ActionTypes.FETCH_LIKES;
	likes: string[];
}

export type PostActions = FetchInitialPosts | AppendPosts;

//actions

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

export const fetchUniversitiesAction = (payload: any) => ({
	type: ActionTypes.FETCH_UNIVERSITIES,
	payload: payload,
});

export const editFavouritesAction = (payload: any) => ({
	type: ActionTypes.EDIT_FAVOURITES,
	payload: payload,
});

export const fetchInitialPosts = (
	posts: any[],
	lastFetched: string
): FetchInitialPosts => ({
	type: ActionTypes.FETCH_INITIAL_POSTS,
	posts: posts,
	lastFetched: lastFetched,
});

export const appendPosts = (
	posts: any[],
	lastFetched: string
): AppendPosts => ({
	type: ActionTypes.APPEND_POSTS,
	posts: posts,
	lastFetched: lastFetched,
});

export const fetchLikes = (likes: string[]): FetchLikes => ({
	type: ActionTypes.FETCH_LIKES,
	likes: likes,
});
