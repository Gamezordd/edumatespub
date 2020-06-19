import { Firebase } from '../../firebase';
import { fetchInitialPosts, appendPosts } from '../../redux';

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
}
