import { Firebase } from '../../firebase';
import { fetchInitialPosts, appendPosts } from '../../redux';
import { addLike, removeLike } from '../../redux/ActionCreators';

export interface InfiniteScrollState {
	hasMore: boolean;
}

export interface InfiniteScrollProps {
	firebase: Firebase;
	posts: any[];
	lastFetched: string;
	favourites: string[];
	fetch: typeof fetchInitialPosts;
	append: typeof appendPosts;
	isLoggedIn: boolean;
}

export interface PostState {
	liked: boolean;
}

export interface PostProps {
	post: any;
	liked: string[];
	likeLocal: typeof addLike;
	unlikeLocal: typeof removeLike;
	firebase: Firebase;
}
