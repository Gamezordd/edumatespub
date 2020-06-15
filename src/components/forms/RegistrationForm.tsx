import _ from 'lodash';
import React from 'react';
import { ValidatorType, validators } from './constants';
import {
	Form,
	Button,
	FormField,
	Input,
	Card,
	Image,
	Grid,
} from 'semantic-ui-react';
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
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const validateURL = `https://us-central1-mpfirebaseproject-7ff28.cloudfunctions.net/api/tokens/validate/`;

class RegistrationFormUncomposed extends React.Component<
	{ firebase: Firebase },
	RegisterState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: { value: '', error: false },
			password: { value: '', error: false },
			name: { value: '', error: false },
			gender: { value: '' },
			phone: { value: '', error: false },
			country: { value: '' },
			isAmbassador: { value: false },
			code: { value: '', error: false },
			type: { value: '', error: false },
			universityId: { value: '', error: false },
			currentInstitute: { value: '', error: false },
			redirect: { value: false },
			errorMessage: { value: '' },
			showError: { value: false },
		};
	}

	handleSubmit = async () => {
		console.log(this.state);
		try {
			if (this.state.isAmbassador.value) {
				const callURL = validateURL + this.state.code.value;
				const data = await axios.get(callURL);
				if (data.data.status === true) {
					this.setState({
						...this.state,
						...{
							type: { value: data.data.type },
							universityId: { value: data.data.universityId },
						},
					});
				} else {
					this.setState({
						...this.state,
						...{
							errorMessage: { value: 'Invalid or used access code.' },
							showError: { value: true },
						},
					});
					return;
				}
			}
			await this.props.firebase.doCreateUserWithEmailAndPassword(
				this.state.email.value.toString(),
				this.state.password.value.toString()
			);
			await this.props.firebase.createUserEntry(this.state);

			const user = await this.props.firebase.doSignInWithEmailAndPassword(
				this.state.email.value.toString(),
				this.state.password.value.toString()
			);

			await user.user?.sendEmailVerification();
			await this.props.firebase.signOut();

			this.setState({ redirect: { value: true } });
		} catch (err) {
			this.setState({
				...this.state,
				...{ showError: { value: true }, errorMessage: { value: err.message } },
			});
		}
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
		this.setState({ ...this.state, ...{ [key]: { value: value } } });
	};

	handleRole = (value: string) => {
		const val = value === 'ambassador' ? true : false;
		this.setState({ ...this.state, ...{ isAmbassador: { value: val } } });
	};

	getError = (key: keyof RegisterState) => this.state[key].error;

	render() {
		if (this.state.redirect.value) return <Redirect to='/login' />;

		const VariableFields = this.state.isAmbassador.value
			? AmbassadorFields
			: StudentFields;

		return (
			<div className='wrapper2'>
				<Grid
					textAlign='center'
					style={{ height: '100vh' }}
					verticalAlign='middle'
				>
					<Grid.Column style={{ maxWidth: 600 }}>
						<Form style={{ top: 100 }}>
							<Image
								size='medium'
								src={process.env.PUBLIC_URL + '/logo.png'}
								className='img'
							/>
							<h2>Create a new account</h2>
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
								className='drop'
								fluid
								search
								selection
								required
								options={countryOptions}
								onChange={(
									event: React.SyntheticEvent<HTMLElement>,
									{ value }
								) => {
									if (value !== undefined) {
										this.syntheticEventHandler('country', value.toString());
									}
								}}
							/>
							<Form.Dropdown
								label='Gender:'
								className='drop'
								fluid
								search
								selection
								required
								options={Genders}
								onChange={(
									event: React.SyntheticEvent<HTMLElement>,
									{ value }
								) => {
									if (value !== undefined) {
										this.syntheticEventHandler('gender', value.toString());
									}
								}}
							/>
							<Form.Dropdown
								label='Role:'
								className='drop'
								fluid
								search
								selection
								required
								options={UserTypes}
								onChange={(
									event: React.SyntheticEvent<HTMLElement>,
									{ value }
								) => {
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
							{this.state.showError.value && (
								<Card fluid style={{ padding: '10px' }}>
									<p style={{ color: 'red' }}>
										{this.state.errorMessage.value}
									</p>
								</Card>
							)}
							<div className='txt'>
								By signing up, you accept the Terms of
								<br /> Service and the Privacy Policy
							</div>
							<Button
								content='Submit'
								onClick={() => this.handleSubmit()}
								className='btn'
								color='orange'
							/>
							<div className='txt'>
								Have an account?<span className='log'>Login.</span>
							</div>
						</Form>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export const RegistrationForm = compose(withFirebase)(
	RegistrationFormUncomposed
);
