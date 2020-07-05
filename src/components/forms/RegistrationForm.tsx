import _ from 'lodash';
import React, { SyntheticEvent } from 'react';
import { ValidatorType, validators } from './constants';
import {
	Form,
	Button,
	FormField,
	Input,
	Card,
	Image,
	Grid,
	Transition,
	Radio,
	TextArea,
	Icon,
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
	ExtraCurricular,
	SportsInterests,
	SubjectInterests,
	RadioQuestions,
} from './RegisterFields';
import './allforms.css';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import logo from '../landing/assets/logo2.png';
import { Link } from 'react-router-dom';
import { RadioGroups } from './RadioGroups';

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
			university: { value: '' },
			undergradCourse: { value: '' },
			redirect: { value: false },
			errorMessage: { value: '' },
			showError: { value: false },
			animationDone: { value: false },
			didNext: { value: false },
			degreeType: { value: '' },
			course: { value: '' },
			workExperience: { value: '' },
			experienceYears: { value: '' },
			experienceIndustry: { value: '' },
			jobTitle: { value: '' },
			description: { value: '' },
			extraCurricular: { value: [] },
			subjectInterests: { value: [] },
			sportsInterests: { value: [] },
			supportAnswer: { value: '' },
			potentialAnswer: { value: '' },
			universityRank: { value: '' },
			universityLocation: { value: '' },
			coursesApplying: { value: '' },
			sportsFacilities: { value: '' },
			societiesOffered: { value: '' },
			enterpriseOpportunities: { value: '' },
			overallExperience: { value: '' },
			networkingOpportunities: { value: '' },
			desiredPopulation: { value: '' },
		};

		this.makeVisible();
	}

	handleSubmit = async () => {
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
							university: { value: data.data.university },
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
				...{
					showError: { value: true },
					errorMessage: { value: err.message },
					didNext: { value: false },
				},
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

	handler = (key: keyof RegisterState, val: any) => {
		console.log('Value is:' + val);
		this.setState({ ...this.state, ...{ [key]: { value: val } } });
	};

	descriptionHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
		if (e.currentTarget.textLength > 80) return;
		const value = e.currentTarget.textContent
			? e.currentTarget.textContent.toString()
			: '';
		this.setState({ description: { value: value } });
	};

	syntheticEventHandler = (
		key: keyof RegisterState,
		value: string | string[],
		multiSelect: boolean = false
	) => {
		if (multiSelect) value = value.toString().split(',');
		console.log(value);
		this.setState({ ...this.state, ...{ [key]: { value: value } } });
	};

	handleRole = (value: string) => {
		const val = value === 'ambassador' ? true : false;
		this.setState({ ...this.state, ...{ isAmbassador: { value: val } } });
	};

	getError = (key: keyof RegisterState) => this.state[key].error;

	makeVisible = () => {
		setTimeout(
			() => this.setState({ ...this.state, animationDone: { value: true } }),
			1
		);
	};

	componentDidUpdate(prevProps: {}, prevState: RegisterState) {
		if (prevState.didNext.value != this.state.didNext.value) {
			this.setState({ animationDone: { value: false } });
			this.makeVisible();
		}
	}

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
					<Transition
						animation='slide down'
						visible={this.state.animationDone.value ? true : false}
					>
						<Form
							style={{
								backgroundColor: 'white',
								border: '3px solid #f3f3f3',
								borderRadius: '25px',
								textAlign: 'left',
								padding: '5%',
							}}
						>
							{this.state.didNext.value && (
								<Button
									icon='arrow left'
									circular
									floated='left'
									onClick={() => this.setState({ didNext: { value: false } })}
									secondary
								/>
							)}
							<Image size='medium' src={logo} centered />
							{!this.state.didNext.value ? (
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
									<Button
										content='Next'
										onClick={() => this.setState({ didNext: { value: true } })}
										color='orange'
										style={{ width: '100%' }}
									/>
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
									{this.state.isAmbassador.value ? (
										<div>
											<Form.Field>
												<b>
													Tell us how you will be of help to future students of
													your college?
												</b>
												<TextArea
													placeholder='Tell us in 80 words....'
													rows={3}
													onChange={e => this.descriptionHandler(e)}
													value={this.state.description.value.toString()}
												/>
											</Form.Field>
										</div>
									) : (
										<div>
											<Form.Field>
												<b>Which degree are you pursuing?</b>
												<Form.Field>
													<Radio
														label='Undergraduate'
														name='degreegroup'
														value='undergraduate'
														checked={
															this.state.degreeType.value === 'undergraduate'
														}
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
														checked={
															this.state.degreeType.value === 'postgraduate'
														}
														onChange={() =>
															this.setState({
																degreeType: { value: 'postgraduate' },
															})
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
											<Form.Field>
												<Form.Dropdown
													placeholder='Subject Interests'
													fluid
													search
													selection
													required
													multiple
													options={SubjectInterests}
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
																'subjectInterests',
																value.toString(),
																true
															);
														}
													}}
												/>
											</Form.Field>
											<Form.Field>
												<Form.Dropdown
													placeholder='Sports Interests'
													fluid
													search
													selection
													required
													multiple
													options={SportsInterests}
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
																'sportsInterests',
																value.toString(),
																true
															);
														}
													}}
												/>
											</Form.Field>
											<Form.Field>
												<Form.Dropdown
													placeholder='Extra Curricular Interests'
													fluid
													search
													selection
													required
													multiple
													options={ExtraCurricular}
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
																'extraCurricular',
																value.toString(),
																true
															);
														}
													}}
												/>
											</Form.Field>
											{this.state.degreeType.value == 'undergraduate' && (
												<Form.Field>
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
											)}
											{this.state.degreeType.value !== 'undergraduate' && (
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
																		'experienceYears',
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
																		'experienceIndustry',
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
											)}
											{RadioQuestions.map(question => (
												<div className='radioQuestion'>
													<b>{question.ques}</b>
													<RadioGroups
														handler={this.handler}
														fieldname={question.key}
													/>
												</div>
											))}
											<Form.Field>
												<b>
													How do you see yourself leveraging your potential in
													the University?
												</b>
												<TextArea
													placeholder='Answer here'
													onChange={(
														event: React.SyntheticEvent<HTMLElement>,
														{ value }
													) => {
														if (value !== undefined) {
															this.syntheticEventHandler(
																'potentialAnswer',
																value.toString()
															);
														}
													}}
												/>
											</Form.Field>
											<Form.Field>
												<b>How can the University best support you?</b>
												<TextArea
													placeholder='Answer here'
													onChange={(
														event: React.SyntheticEvent<HTMLElement>,
														{ value }
													) => {
														if (value !== undefined) {
															this.syntheticEventHandler(
																'supportAnswer',
																value.toString()
															);
														}
													}}
												/>
											</Form.Field>
										</div>
									)}
									<Button
										content='Submit'
										onClick={() => this.handleSubmit()}
										className='btn'
										color='orange'
										style={{ width: '100%' }}
									/>
								</div>
							)}
							{this.state.showError.value && (
								<Card fluid style={{ padding: '10px' }}>
									<p style={{ color: 'red' }}>
										{this.state.errorMessage.value}
									</p>
								</Card>
							)}
						</Form>
					</Transition>
				</Grid.Column>
			</Grid>
		);
	}
}

export const RegistrationForm = compose(withFirebase)(
	RegistrationFormUncomposed
);
