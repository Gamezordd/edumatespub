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
	Radio,
} from 'semantic-ui-react';
import { RegisterState } from './types';
import { countryOptions } from './countriesData';
import {
	CommonFields,
	AmbassadorFields,
	StudentFields,
	Genders,
	UserTypes,
	Years,
} from './RegisterFields';
import './allforms.css';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import logo from '../landing/assets/logo2.png';
import { Link } from 'react-router-dom';

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
			didSubmit: { value: true },
			degreeType: { value: '' },
			previousInstitute: { value: '' },
			course: { value: '' },
			workExperience: { value: '' },
			years: { value: '' },
			industry: { value: '' },
			jobTitle: { value: '' },
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
			const user = await this.props.firebase.doCreateUserWithEmailAndPassword(
				this.state.email.value.toString(),
				this.state.password.value.toString()
			);
			await this.props.firebase.createUserEntry({
				...this.state,
				...{ uid: user.user?.uid },
			});
			await user.user?.sendEmailVerification();

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
			<Grid
				textAlign='center'
				style={{ height: '160vh' }}
				verticalAlign='middle'
			>
				<Grid.Column style={{ maxWidth: 600 }}>
					<Form
						style={{
							backgroundColor: 'white',
							border: '3px solid #f3f3f3',
							borderRadius: '25px',
							textAlign: 'left',
							padding: '5%',
						}}
					>
						<Image size='medium' src={logo} centered />
						{this.state.didSubmit.value == true ? (
							<div>
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
									placeholder='Country:'
									fluid
									search
									selection
									required
									options={countryOptions}
									style={{
										border: 'none',
										borderBottom: 'solid',
										borderBottomWidth: '1px',
									}}
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
									placeholder='Gender:'
									fluid
									search
									selection
									required
									options={Genders}
									style={{
										border: 'none',
										borderBottom: 'solid',
										borderBottomWidth: '1px',
									}}
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
									placeholder='Role:'
									fluid
									search
									selection
									required
									options={UserTypes}
									style={{
										border: 'none',
										borderBottom: 'solid',
										borderBottomWidth: '1px',
									}}
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
								<Button
									content='Next'
									onClick={() => this.setState({ didSubmit: { value: false } })}
									color='orange'
									style={{ width: '100%' }}
								>
									Next
								</Button>
								<div style={{ textAlign: 'center' }}>
									By signing up, you accept the Terms of
									<br /> Service and the Privacy Policy
								</div>

								<div style={{ textAlign: 'center' }}>
									Have an account?<Link to={'/login'}>Login</Link>{' '}
								</div>
							</div>
						) : (
							<div>
								<Form.Field>
									Type of Degree:
									<Form.Field>
										<Radio
											label='Undergraduate'
											name='degreegroup'
											value='undergraduate'
											checked={this.state.degreeType.value === 'undergraduate'}
											onChange={() =>
												this.setState({
													degreeType: { value: 'undergraduate' },
												})
											}
										/>
									</Form.Field>
									<Form.Field>
										<Radio
											label='Postgraduate'
											name='degreegroup'
											value='postgraduate'
											checked={this.state.degreeType.value === 'postgraduate'}
											onChange={() =>
												this.setState({ degreeType: { value: 'postgraduate' } })
											}
										/>
									</Form.Field>
									<Form.Field>
										<Radio
											label='PhD'
											name='degreegroup'
											value='phd'
											checked={this.state.degreeType.value === 'phd'}
											onChange={() =>
												this.setState({ degreeType: { value: 'phd' } })
											}
										/>
									</Form.Field>
								</Form.Field>
								{this.state.degreeType.value == 'undergraduate' ? (
									<Form.Field>
										<Form.Field>
											<Input
												placeholder='Previous Institute'
												name='previousInstitute'
												icon='university'
												iconPosition='left'
												required
												onChange={(
													event: React.SyntheticEvent<HTMLElement>,
													{ value }
												) => {
													if (value !== undefined) {
														this.syntheticEventHandler(
															'previousInstitute',
															value.toString()
														);
													}
												}}
											/>
										</Form.Field>
										<Form.Field>
											<Input
												placeholder='Course'
												name='course'
												icon='graduation'
												iconPosition='left'
												required
												onChange={(
													event: React.SyntheticEvent<HTMLElement>,
													{ value }
												) => {
													if (value !== undefined) {
														this.syntheticEventHandler(
															'course',
															value.toString()
														);
													}
												}}
											></Input>
										</Form.Field>
									</Form.Field>
								) : null}
								{this.state.degreeType.value == 'postgraduate' ||
								this.state.degreeType.value == 'phd' ? (
									<Form.Field>
										<Form.Field>
											<Input
												placeholder='Work Experience'
												name='workExperience'
												icon='envelope open'
												iconPosition='left'
												required
												onChange={(
													event: React.SyntheticEvent<HTMLElement>,
													{ value }
												) => {
													if (value !== undefined) {
														this.syntheticEventHandler(
															'workExperience',
															value.toString()
														);
													}
												}}
											></Input>
										</Form.Field>
										<Form.Field>
											<Form.Dropdown
												placeholder='Years of Experience:'
												fluid
												search
												selection
												required
												options={Years}
												style={{
													border: 'none',
													borderBottom: 'solid',
													borderBottomWidth: '1px',
												}}
												onChange={(
													event: React.SyntheticEvent<HTMLElement>,
													{ value }
												) => {
													if (value !== undefined) {
														this.syntheticEventHandler(
															'years',
															value.toString()
														);
													}
												}}
											/>
										</Form.Field>
										<Form.Field>
											<Input
												placeholder='Industry Worked In'
												name='industry'
												icon='industry'
												iconPosition='left'
												required
												onChange={(
													event: React.SyntheticEvent<HTMLElement>,
													{ value }
												) => {
													if (value !== undefined) {
														this.syntheticEventHandler(
															'industry',
															value.toString()
														);
													}
												}}
											></Input>
										</Form.Field>
										<Form.Field>
											<Input
												placeholder='Job Title'
												name='jobTitle'
												icon='vcard'
												iconPosition='left'
												required
												onChange={(
													event: React.SyntheticEvent<HTMLElement>,
													{ value }
												) => {
													if (value !== undefined) {
														this.syntheticEventHandler(
															'jobTitle',
															value.toString()
														);
													}
												}}
											></Input>
										</Form.Field>
									</Form.Field>
								) : null}
								<Button
									content='Submit'
									onClick={() => this.handleSubmit()}
									className='btn'
									color='orange'
									style={{ width: '100%' }}
								/>
							</div>
						)}
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

export const RegistrationForm = compose(withFirebase)(
	RegistrationFormUncomposed
);
