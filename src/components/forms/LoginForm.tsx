import _ from 'lodash';
import React from 'react';
import { ValidatorType, validators } from './constants';
import { Form, Button, FormField, Input, Card } from 'semantic-ui-react';
import { LoginState } from './types';
import { FormFields } from './LoginFields';
import { Firebase } from '../../firebase';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { loginAction, fetchUniversitiesAction } from '../../redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const mapDispatchToProps = (dispatch: any) => ({
	login: (payload: any) => dispatch(loginAction(payload)),
	fetchUniversities: (universityIds: string[]) =>
		dispatch(fetchUniversitiesAction(universityIds)),
});

const mapStateToProps = (state: any) => {
	return {
		universities: state.universities,
	};
};

class LoginForm extends React.Component<
	{
		firebase: Firebase;
		login: typeof loginAction;
		fetchUniversities: typeof fetchUniversitiesAction;
		universities: any
	},
	LoginState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: { value: '', error: false },
			password: { value: '', error: false },
			redirect: { value: false },
			errorMessage: { value: '' },
			showError: { value: false },
		};
	}

	handleSubmit = async () => {
		try {
			console.log(this.state);

			await this.props.firebase
				.doSignInWithEmailAndPassword(
					this.state.email.value.toString(),
					this.state.password.value.toString()
				)
				.then(async authUser => {
					if (
						authUser.user?.email === undefined ||
						authUser.user.email === null
					) {
						return;
					}
					console.log(authUser.user.email);
					const user = await this.props.firebase.getUser(authUser.user.email);
					return user;
				})
				.then(async user => {
					if (user !== undefined) {
						const payload = user.docs[0].data();
						payload.uid = user.docs[0].id;
						this.props.login(payload);
					}
					const unis = await this.props.firebase.getUniversities();
					return unis;
				})
				.then(async (unis: any) => {
					this.props.fetchUniversities(unis);
				})
				.then(async () => {
					this.setState({ redirect: { value: true } });
				});
		} catch (err) {
			console.log(err);
			this.setState({
				...this.state,
				...{ showError: { value: true }, errorMessage: { value: err.message } },
			});
		}
	};

	validate = (
		key: keyof ValidatorType,
		stateKey: keyof LoginState,
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

	getError = (key: keyof LoginState) => this.state[key].error;

	render() {
		if (this.state.redirect.value) {
			return <Redirect to='/' />;
		}

		return (
			<div>
				<h2>Log in</h2>
				<Form>
					{_.map(FormFields, field => (
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
				{this.state.showError.value && (
					<Card fluid style={{ padding: '10px' }}>
						<p style={{ color: 'red' }}>{this.state.errorMessage.value}</p>
					</Card>
				)}
			</div>
		);
	}
}

export const LoginFormComposed = compose(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(LoginForm);
