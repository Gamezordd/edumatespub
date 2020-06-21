import * as ActionTypes from '../ActionTypes';
import { PostActions } from '../ActionCreators';

export const Posts = (
	state: { posts: any[]; lastFetched: string | null } = {
		posts: [],
		lastFetched: null,
	},
	action: PostActions
) => {
	switch (action.type) {
		case ActionTypes.FETCH_INITIAL_POSTS: {
			return { posts: action.posts, lastFetched: action.lastFetched };
		}
		case ActionTypes.APPEND_POSTS: {
			return {
				posts: state.posts.concat(action.posts),
				lastFetched: action.lastFetched,
			};
		}
		case ActionTypes.CLEAR_POSTS: {
			return { posts: [], lastFetched: null };
		}
		default: {
			return state;
		}
	}
};
