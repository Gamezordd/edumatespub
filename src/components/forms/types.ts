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
	properties: FormFieldProps;
}

export interface FieldError {
	content: string;
	pointing: 'below';
}

export interface FieldState {
	value: string;
	error: FieldError | false;
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
	//student fields
	//GRE?: number;

	//ambassador fields
	//university?: number;
}
