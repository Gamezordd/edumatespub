import { Firebase } from '../../firebase';
import { fetchInitialPosts, appendPosts } from '../../redux';
import { addLike, removeLike, storeScroll } from '../../redux/ActionCreators';

export interface InfiniteScrollState {
	hasMore: boolean;
	scroll: number;
	authFail: boolean;
}

export interface InfiniteScrollProps {
	firebase: Firebase;
	posts: any[];
	lastFetched: string;
	scroll: number;
	favourites: string[];
	fetch: typeof fetchInitialPosts;
	append: typeof appendPosts;
	saveScroll: typeof storeScroll;
	isLoggedIn: boolean;
	isAmbassador: boolean;
}

export interface PostState {
	liked: boolean;
	animationDone: boolean;
	name: string;
	profileImage: string;
	university: string;
}

export interface PostProps {
	post: any;
	liked: string[];
	likeLocal: typeof addLike;
	unlikeLocal: typeof removeLike;
	firebase: Firebase;
	universityId: string;
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
