import { Plan } from './types';
import { update } from 'lodash';

export const plans: Plan[] = [
	{
		title: ' ',
		name: 'Free Trial',
		description: 'Create your wishlist with one university.',
		description2: 'Access student ambassador from one university.',
		button: 'Return',
		duration: 0,
		price: 0,
	},

	{
		title: 'RECOMMENDED',
		name: 'Monthly',
		description: 'Create your wishlist with unlimited universities.',
		description2:
			'Create a wish list and chat with unlimited university representatives.',
		button: 'Sign up',
		duration: 30,
		price: 499,
	},
	{
		title: ' ',
		name: 'Annual',
		description: 'Explore the top 25 universities in the UK.',
		description2:
			'Create a wish list and chat with unlimited university representatives.',
		button: 'Sign up',
		duration: 90,
		price: 2388,
	},
];
