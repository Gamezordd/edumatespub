import { LoginFieldType } from './types';

export const FormFields: LoginFieldType[] = [
	{
		key: 'email',
		validate: 'email',
		properties: {
			type: 'text',

			icon: 'mail',
			required: true,
			iconPosition: 'left',
			placeholder: 'Email ID',
		},
	},
	{
		key: 'password',
		validate: 'any',
		properties: {
			type: 'password',

			icon: 'lock',
			iconPosition: 'left',
			required: true,
			placeholder: 'Password',
		},
	},
];
