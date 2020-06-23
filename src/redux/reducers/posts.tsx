import * as ActionTypes from '../ActionTypes';
import { PostActions } from '../ActionCreators';

export const Posts = (
	state: { posts: any[]; lastFetched: string | null; yScroll: number } = {
		posts: [],
		lastFetched: null,
		yScroll: 0,
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
			return { posts: [], lastFetched: null, yScroll: 0 };
		}
		case ActionTypes.STORE_SCROLL: {
			return { ...state, yScroll: action.scroll };
		}
		default: {
			return state;
		}
	}
};
