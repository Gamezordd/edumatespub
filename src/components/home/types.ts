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
	isAmbassador: boolean;
}

export interface PostState {
	liked: boolean;
	animationDone: boolean;
}

export interface PostProps {
	post: any;
	liked: string[];
	likeLocal: typeof addLike;
	unlikeLocal: typeof removeLike;
	firebase: Firebase;
}

export interface CreatePostState {
	hasFile: boolean;
	title: string;
	content: string;
	file: File | null;
	progress: number;
	isUploading: boolean;
	fileUrl: string | null;
	success: boolean;
	error: boolean;
	filename: string;
	animationDone: boolean;
}
