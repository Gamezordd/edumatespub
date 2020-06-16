import { Firebase } from '../../firebase';
import { FetchInitialPosts, AppendPosts } from '../../redux/ActionCreators';

export interface InfiniteScrollState {}

export interface InfiniteScrollProps {
	firebase: Firebase;
	posts: any[];
	lastFetched: string;
	fetchInititalPosts: FetchInitialPosts;
	appendPosts: AppendPosts;
}
