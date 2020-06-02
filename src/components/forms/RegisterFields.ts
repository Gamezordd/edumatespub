import { RegisterFieldType } from './types';

/*
TODO: Make all fields for users. StudentFields and AmbassadorFields are keys inside the data map.

Refer to this link for icon values:
https://react.semantic-ui.com/elements/icon/

Update type interface in ./types.ts
*/

export const CommonFields: RegisterFieldType[] = [
	{
		key: 'email',
		validate: 'email',
		properties: {
			type: 'text',
			label: 'E-mail',
			icon: 'mail',
			required: true,
			iconPosition: 'left',
		},
	},
];

export const StudentFields: RegisterFieldType[] = [
	{
		key: 'GRE',
		validate: 'any',
		properties: {
			type: 'text',
			label: 'E-mail',
			icon: 'pencil square',
			required: true,
			iconPosition: 'left',
		},
	},
];

export const AmbassadorFields: RegisterFieldType[] = [
	{
		key: 'university',
		validate: 'any',
		properties: {
			type: 'text',
			label: 'E-mail',
			icon: 'building',
			required: true,
			iconPosition: 'left',
		},
	},
];
