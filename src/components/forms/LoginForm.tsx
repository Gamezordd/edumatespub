import _ from 'lodash';
import React, { useContext } from 'react';
import { ValidatorType, validators } from './constants';
import { Form, Button, FormField, Input } from 'semantic-ui-react';
import { LoginState } from './types';
import { FormFields } from './LoginFields';
import { Firebase } from '../../firebase';
//import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { loginAction } from '../redux';
import * as Creators from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch: any) => ({
	login: (payload: any) => dispatch(loginAction(payload)),
});

class LoginForm extends React.Component<
	{ firebase: Firebase; login: typeof loginAction },
	LoginState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: { value: '', error: false },
			password: { value: '', error: false },
		};
	}

	handleSubmit = async () => {
		try {
			console.log(this.state);
			const user = await this.props.firebase
				.doSignInWithEmailAndPassword(
					this.state.email.value,
					this.state.password.value
				)
				.then(authUser => {
					this.props.login(authUser);
				});
			console.log(user);
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
