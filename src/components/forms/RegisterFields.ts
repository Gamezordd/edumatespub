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
	{ value: 'ambassador', text: 'Representative' },
	{ value: 'student', text: 'Student' },
];
export const Years: DropdownItemProps[] = [
	{ value: 'none', text: 'No experience' },
	{ value: '0-3years', text: '0-3 years' },
	{ value: '3-10years', text: '3-10 years' },
	{ value: '10+years', text: '10+ years' },
];

export const CommonFields: RegisterFieldType[] = [
	{
		key: 'email',
		validate: 'email',
		properties: {
			type: 'text',
			placeholder: 'E-mail',
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
			placeholder: 'Mobile Number',
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
			placeholder: 'Name',
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
			placeholder: 'Password',
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
			placeholder: 'Current Institute',
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
			placeholder: 'Access Code',
			icon: 'tag',
			required: true,
			iconPosition: 'left',
		},
	},
	{
		key: 'course',
		validate: 'any',
		properties: {
			type: 'text',
			placeholder: 'Course',
			icon: 'book',
			required: true,
			iconPosition: 'left',
		},
	},
];
