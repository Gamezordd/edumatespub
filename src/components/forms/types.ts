import { FormFieldProps } from 'semantic-ui-react';
import { ValidatorType } from './constants';

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
	GRE: FieldState;
	GPA: FieldState;
	//ambassador fields
	university: FieldState;
}
