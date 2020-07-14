import { Firebase } from '../../firebase';

export interface DiscoverProps {
	uniList: any;
	user: any;
	editFavourites: (payload: { ids: string[]; add?: boolean }) => void;
	firebase: Firebase;
	onlyFavourites?: boolean;
	isAmbassador: boolean;
}

export interface initialStateProps {
	triggerRerender: boolean; //change will trigger rerender
	isModalOpen: boolean;
	showCard: boolean;
	isLoading: boolean;
	resultsLoading: boolean;
	results: object[];
	value: string | undefined;
	showChat: string | null;
	selection: {
		title: string;
		image: string;
		description: string;
		id?: string;
		details: {};
	};
	places: Array<{
		lat: number;
		lng: number;
		details: {
			name: string;
			description: string;
			image: string;
			videoURL: string;
			department: [{ name: string; link: string }];
			FAQLink: string;
		};
	}>;
}

export interface CardContainerProps {
	selected: boolean;
	data: object[];
	onFavouriteButtonClick: (universityId: string[], add?: boolean) => void;
	onCardClick: (
		place: Array<{
			lat: number;
			lng: number;
			details: {
				name: string;
				description: string;
				image: string;
				videoURL: string;
				department: [{ name: string; link: string }];
				FAQLink: string;
			};
		}>
	) => void;
	setChat: (id: string) => void;
	selectedCardData?: any;
	favouriteUnis: string[];
	onlyFavourites?: boolean;
	isAmbassador: boolean;
}

export interface ButtonProps {
	content: any;
	show?: boolean;
	favourite: boolean;
	isAmbassador: boolean;
	onFavouriteButtonClick: (universityId: string[], add?: boolean) => void;
	onCardClick: (
		place: Array<{
			lat: number;
			lng: number;
			details: {
				name: string;
				description: string;
				image: string;
				videoURL: string;
				department: [{ name: string; link: string }];
				FAQLink: string;
			};
			centerMap?: boolean;
		}>
	) => void;
	onlyFavourites?: boolean;
	setChat: (id: string) => void;
}

export interface ModalMapContainerPropTypes {
	places: Array<{
		lat: number;
		lng: number;
		details: { name: string; description?: string };
	}>;
	zoomProp: number;
	searchType: any;
}

export interface DiscoverContainerProps {
	firebase?: Firebase;
	universities?: any;
	isLoggedIn?: boolean;
	onlyFavourites?: boolean;
	isAmbassador?: boolean;
}
