import { RegisterFieldType } from './types';
import { DropdownItemProps } from 'semantic-ui-react';

/*
TODO: Make all fields for users. StudentFields and AmbassadorFields are keys inside the data map.

Refer to this link for icon values:
https://react.semantic-ui.com/elements/icon/

Update type interface in ./types.ts
*/

export const Genders: DropdownItemProps[] = [
	{ icon: 'man', value: 'male', text: 'Male' },
	{ icon: 'woman', value: 'female', text: 'Female' },
	{ icon: 'intersex', value: 'other', text: 'Other' },
];

export const UserTypes: DropdownItemProps[] = [
	{ value: 'ambassador', text: 'Ambassador' },
	{ value: 'student', text: 'Student' },
];

export const CommonFields: RegisterFieldType[] = [
	{
		key: 'email',
		validate: 'email',
		properties: {
			type: 'text',
			label: 'E-mail:',
			icon: 'mail',
			required: true,
			iconPosition: 'left',
		},
	},
	{
		key: 'phone',
		validate: 'phone',
		properties: {
			type: 'text',
			label: 'Mobile no:',
			icon: 'phone',
			required: true,
			iconPosition: 'left',
		},
	},
	{
		key: 'name',
		validate: 'name',
		properties: {
			type: 'name',
			label: 'Name:',
			icon: 'user',
			required: true,
			iconPosition: 'left',
		},
	},
	{
		key: 'password',
		validate: 'password',
		properties: {
			type: 'password',
			label: 'Password:',
			icon: 'lock',
			required: true,
			iconPosition: 'left',
		},
	},
];

export const StudentFields: RegisterFieldType[] = [
	{
		key: 'currentInstitute',
		validate: 'name',
		properties: {
			type: 'text',
			label: 'Current Institute:',
			icon: 'university',
			required: true,
			iconPosition: 'left',
		},
	},
];

export const AmbassadorFields: RegisterFieldType[] = [
	{
		key: 'code',
		validate: 'code',
		properties: {
			type: 'text',
			label: 'Access Code:',
			icon: 'tag',
			required: true,
			iconPosition: 'left',
		},
	},
];
