export const descriptionLength: number = 200;
export const searchDescriptionLength: number = 200;

export const uniImagePlaceholder: string = 'https://firebasestorage.googleapis.com/v0/b/mpfirebaseproject-7ff28.appspot.com/o/University%2FAston.PNG?alt=media&token=8044ddeb-e207-4c3a-aa53-a8e36db6e250'
//"title", 'description" and "image" will be shown in search results
export const universities = [
	{
		id: 'universityIdHere',
		title: 'Manipal Institute of Technology',
		description: 'Crappy university with a horrible EEE department',
		image:
			'https://manipal.edu/content/dam/manipal/mu/images/galleryImage/Simulation%20Centre/SimCentre1.JPG.transform/manipal-edu-transform-width-height-752px/image.jpg',
		details: {
			contact: { phone: '000', email: '000', address: '000' },
			images: [],
			location: { X: '', Y: '' },
		},
	},
];

export const initialState = {
	triggerRerender: false, //change will trigger rerender
	isModalOpen: false,
	showCard: false,
	isLoading: false,
	results: [],
	value: '',
	selection: {
		title: '',
		image: '',
		description: '',
	},
	places: []
};

//cards for various screen sizes

export const cardWidths = [
	{minWidth: 400, cols: 1},
	{minWidth: 800, cols: 2},
	{minWidth: 1200, cols: 4}
]