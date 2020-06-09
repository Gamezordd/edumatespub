import _ from 'lodash';
import React from 'react';
import { ValidatorType, validators } from './constants';
import { Form, Button, FormField, Input } from 'semantic-ui-react';
import { LoginState } from './types';
import { FormFields } from './LoginFields';
import { Firebase } from '../../firebase';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { loginAction, editFavouritesAction } from '../../redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const mapDispatchToProps = (dispatch: any) => ({
	login: (payload: any) => dispatch(loginAction(payload)),
	editFavourites: (universityIds: string[], add?: boolean) => dispatch(editFavouritesAction(universityIds, add))
});

class LoginForm extends React.Component<
	{ 
		firebase: Firebase;
		login: typeof loginAction;
		editFavourites: typeof editFavouritesAction;
	},
	LoginState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: { value: '', error: false },
			password: { value: '', error: false },
			redirect: { value: false },
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
					console.log("inside getuniversities");
					if (user !== undefined) {
						const payload = user.docs[0].data();
						payload.uid = user.docs[0].id;
						this.props.login(payload);
					}

					const unis = await this.props.firebase.getUniversities();
					console.log("unis: ", unis);
					return unis;
				})
				.then(async (unis: any) => {
					console.log("inside editfavourites");
					
					this.props.editFavourites(unis, true);
					this.setState({ redirect: { value: true } });
				});

		} catch (err) {
			console.log(err + this.state.password.value);
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
			</div>
		);
	}
}

export const LoginFormComposed = compose(
	withFirebase,
	connect(null, mapDispatchToProps)
)(LoginForm);
