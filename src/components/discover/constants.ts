export const descriptionLength: number = 170;
export const searchDescriptionLength: number = 200;

export const uniImagePlaceholder: string =
	'https://firebasestorage.googleapis.com/v0/b/mpfirebaseproject-7ff28.appspot.com/o/University%2FAston.PNG?alt=media&token=8044ddeb-e207-4c3a-aa53-a8e36db6e250';
//"title", 'description" and "image" will be shown in search results

export const placesFilterOptions = [
	{
		key: 'restaurants',
		value: 'restaurants',
		text: 'Restaurants',
	},
	{
		key: 'nightclub',
		value: 'night_club',
		text: 'Night Clubs',
	},
	{
		key: 'accomodation',
		value: 'accomodation',
		text: 'Accomodation',
	},
	{
		key: 'tourist_attraction',
		value: 'tourist_attraction',
		text: 'Attractions',
	},
	{
		key: 'gym',
		value: 'gym',
		text: 'Gym',
	},
	{
		key: 'cafe',
		value: 'cafe',
		text: 'Cafe',
	},
	{
		key: 'pharmacy',
		value: 'pharmacy',
		text: 'Pharmacy',
	},
];

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

//cards for various screen sizes

export const cardWidths = [
	{ minWidth: 0, cols: 1 },
	{ minWidth: 800, cols: 2 },
	{ minWidth: 1200, cols: 4 },
];
