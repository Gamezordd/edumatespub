import _ from 'lodash';
import React from 'react';
import { ValidatorType, validators } from './constants';
import { Form, Button, FormField, Input } from 'semantic-ui-react';
import { RegisterState } from './types';
import { countryOptions } from './countriesData';
import {
	CommonFields,
	AmbassadorFields,
	StudentFields,
	Genders,
	UserTypes,
} from './RegisterFields';
import './RegistrationForm.css';

export class RegistrationForm extends React.Component<{}, RegisterState> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: { value: '', error: false },
			password: { value: '', error: false },
			name: { value: '', error: false },
			gender: { value: '' },
			country: { value: '' },
			isAmbassador: { value: false },
			GRE: { value: '', error: false },
			university: { value: '', error: false },
			phone: { value: '', error: false },
			GPA: { value: '', error: false },
		};
	}

	handleSubmit = () => {
		console.log('submitted');
	};

	genderUpdater = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ ...this.state, ...{ gender: { value: e.target.value } } });
	};

	validate = (
		key: keyof ValidatorType,
		stateKey: keyof RegisterState,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (RegExp(validators[key].regex).test(e.target.value)) {
			this.setState({
				...this.state,
				...{ [stateKey]: { value: e.target.value, error: false } },
			});
		} else {
			this.setState({
				...this.state,
				...{
					[stateKey]: {
						value: '',
						error: { pointing: 'below', content: validators[key].message },
					},
				},
			});
		}
	};

	syntheticEventHandler = (key: keyof RegisterState, value: string) => {
		this.setState({ ...this.state, ...{ [key]: value } });
	};

	handleRole = (value: string) => {
		console.log(value);
		const val = value === 'ambassador' ? true : false;
		this.setState({ ...this.state, ...{ isAmbassador: { value: val } } });
	};

	getError = (key: keyof RegisterState) => this.state[key].error;

	render() {
		const VariableFields = this.state.isAmbassador.value
			? AmbassadorFields
			: StudentFields;

		return (
			<div>
				<h2>Register</h2>
				<Form>
					{_.map(CommonFields, field => (
						<FormField
							{...field.properties}
							control={Input}
							error={this.getError(field.key)}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								this.validate(field.validate, field.key, e)
							}
						/>
					))}
					<Form.Dropdown
						label='Country:'
						fluid
						search
						selection
						required
						options={countryOptions}
						onChange={(event: React.SyntheticEvent<HTMLElement>, { value }) => {
							if (value !== undefined) {
								this.syntheticEventHandler('country', value.toString());
							}
						}}
					/>
					<Form.Dropdown
						label='Gender:'
						fluid
						search
						selection
						required
						options={Genders}
						onChange={(event: React.SyntheticEvent<HTMLElement>, { value }) => {
							if (value !== undefined) {
								this.syntheticEventHandler('gender', value.toString());
							}
						}}
					/>
					<Form.Dropdown
						label='Role:'
						fluid
						search
						selection
						required
						options={UserTypes}
						onChange={(event: React.SyntheticEvent<HTMLElement>, { value }) => {
							if (value !== undefined) {
								this.handleRole(value.toString());
							}
						}}
					/>
					{_.map(VariableFields, field => (
						<FormField
							{...field.properties}
							control={Input}
							error={this.getError(field.key)}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								this.validate(field.validate, field.key, e)
							}
						/>
					))}
					<Button content='Submit' onClick={() => this.handleSubmit()} />
				</Form>
			</div>
		);
	}
}
