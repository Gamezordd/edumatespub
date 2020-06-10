import { Firebase } from '../../firebase';

export interface DiscoverProps {
	uniList: any;
	user: any;
	editFavourites: (payload: { ids: string[]; add?: boolean }) => void;
	firebase: Firebase;
}

export interface initialStateProps {
	triggerRerender: boolean; //change will trigger rerender
	isModalOpen: boolean;
	showCard: boolean;
	isLoading: boolean;
	results: object[];
	value: string | undefined;
	selection: {
		title: string;
		image: string;
		description: string;
		id?: string;
	};
}

export interface CardContainerProps {
	selected: boolean;
	data: object[];
	onFavouriteButtonClick: (universityId: string[], add?: boolean) => void;
	selectedCardData?: {};
	favouriteUnis: string[];
}
