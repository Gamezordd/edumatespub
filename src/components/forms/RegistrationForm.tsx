import _ from 'lodash';
import React from 'react';
import { ValidatorType, validators } from './constants';
import { Form, Button, FormField, Input } from 'semantic-ui-react';
import { LoginState, RegisterState } from './types';
import {
	CommonFields,
	//AmbassadorFields,
	//StudentFields,
} from './RegisterFields';

export class RegistrationForm extends React.Component<{}, RegisterState> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: { value: '', error: false },
			password: { value: '', error: false },
			name: { value: '', error: false },
			gender: { value: '', error: false },
		};
	}

	handleSubmit = () => {
		console.log('submitted');
	};

	validate = (
		key: keyof ValidatorType,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (RegExp(validators[key].regex).test(e.target.value)) {
			this.setState({
				...this.state,
				...{ [key]: { value: e.target.value, error: false } },
			});
		} else {
			this.setState({
				...this.state,
				...{
					[key]: {
						value: '',
						error: { pointing: 'below', content: validators[key].message },
					},
				},
			});
		}
	};

	getError = (key: keyof RegisterState) => this.state[key].error;

	render() {
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
								this.validate(field.validate, e)
							}
						/>
					))}
					<Button content='Submit' onClick={() => this.handleSubmit()} />
				</Form>
			</div>
		);
	}
}
