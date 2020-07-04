import { FormFieldProps } from 'semantic-ui-react';
import { ValidatorType } from './constants';
import { Firebase } from '../../firebase';

export interface LoginFieldType {
	key: keyof LoginState;
	validate: keyof ValidatorType;
	properties: FormFieldProps;
}

export interface RegisterFieldType {
	key: keyof RegisterState;
	validate: keyof ValidatorType;
	properties: FormFieldProps | any;
}

export interface FieldError {
	content: string;
	pointing: 'below';
}

export interface FieldState {
	value: string | boolean;
	error?: FieldError | false;
}

export interface LoginState {
	email: FieldState;
	password: FieldState;
	redirect: FieldState;

	errorMessage: FieldState;
	showError: FieldState;

	animationDone: FieldState;
}

export interface RegisterState {
	//common fields
	name: FieldState;
	email: FieldState;
	password: FieldState;
	gender: FieldState;
	country: FieldState;
	isAmbassador: FieldState;
	phone: FieldState;

	//student fields
	currentInstitute: FieldState;

	//undergraduate
	degreeType: FieldState;
	undergradCourse: FieldState;

	//higher than undergrad
	workExperience: FieldState;
	experienceYears: FieldState;
	experienceIndustry: FieldState;
	jobTitle: FieldState;

	//ambassador fields
	code: FieldState;
	type: FieldState;
	universityId: FieldState;
	university: FieldState;
	course: FieldState;
	description: FieldState;

	//UI states
	redirect: FieldState;
	errorMessage: FieldState;
	showError: FieldState;
	didNext: FieldState;

	animationDone: FieldState;
}

export interface PasswordForgotProps {
	firebase: Firebase;
}

export interface PasswordForgotState {
	email: string;
	error: any;
	animationDone: boolean;
}
