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
	places: object[]
}

export interface CardContainerProps {
	selected: boolean;
	data: object[];
	onFavouriteButtonClick: (universityId: string[], add?: boolean) => void;
	onCardClick: (place: object[]) => void;
	selectedCardData?: {};
	favouriteUnis: string[];
}

export interface ButtonProps {
	content: any;
	show?: boolean;
	favourite: boolean;
	onFavouriteButtonClick: (universityId: string[], add?: boolean) => void;
	onCardClick: (place: object[]) => void;
}


export interface ModalMapContainerPropTypes{
    places: Array<{
		lat: number;
		lng: number;
		details: { name: string; description: string };
	}>;
	zoomProp: number;
}

export interface DiscoverContainerProps {
	firebase: Firebase;
	universities: any;
}