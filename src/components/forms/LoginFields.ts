import { FieldType } from './types';

export const FormFields: FieldType[] = [
	{
		key: 'email',
		properties: {
			type: 'text',
			label: 'E-mail',
			icon: 'mail',
			required: true,
			iconPosition: 'left',
		},
	},
	{
		key: 'password',
		properties: {
			type: 'password',
			label: 'Password',
			icon: 'lock',
			iconPosition: 'left',
			required: true,
		},
	},
];
