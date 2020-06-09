export interface DiscoverProps {
	uniList: any;
	user: any;
	editFavourites: typeof editFavouritesAction;
}

export interface initialStateProps{
	triggerRerender: boolean,			//change will trigger rerender
	isModalOpen: boolean,
	showCard: boolean,
	isLoading: boolean,
	results: object[],
	value: string | undefined,
	selection: {
		title: string,
		image: string,
		description: string,
		id?: string
	},
}