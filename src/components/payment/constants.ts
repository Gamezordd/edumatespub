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
		description2: 'Unrestricted access to ALL student ambasaddors.',
		button: 'Sign up',
		duration: 30,
		price: 499,
	},
	{
		title: ' ',
		name: 'Annual',
		description: 'Create your wishlist with unlimited universities.',
		description2: 'Unrestricted access to ALL student ambasaddors.',
		button: 'Sign up',
		duration: 90,
		price: 899,
	},
];
