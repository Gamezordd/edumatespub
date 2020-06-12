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
};
