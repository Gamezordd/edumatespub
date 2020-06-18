import _ from 'lodash';
import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { ChangeEvent } from 'react';
import { Input, Button, Form, Grid, Image } from 'semantic-ui-react';
import './PasswordForgot.css';
import logo from '../landing/assets/logo2.png';

export interface PasswordForgotProps {
	firebase: Firebase;
}

export interface PasswordForgotState {
	email: string;
	error: any;
}
const INITIAL_STATE = {
	email: '',
	error: null,
};

class PasswordForgotUncomposed extends React.Component<
	PasswordForgotProps,
	PasswordForgotState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			email: '',
			error: ' ',
		};
	}

	onSubmit = (event: any) => {
		console.log(this.state.email);
		this.props.firebase
			.doPasswordReset(this.state.email)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch(error => {
				this.setState({ error });
			});

		event.preventDefault();
	};
	onChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ email: event.target.value });
	};

	render() {
		const { email, error } = this.state;

		const isInvalid = email === '';
		return (
			<div className='wrapper1'>
				<Grid
					textAlign='center'
					style={{ height: '100vh' }}
					verticalAlign='middle'
				>
					<Grid.Column style={{ maxWidth: 600 }}>
						<Form onSubmit={this.onSubmit}>
							<Image size='medium' src={logo} className='img' />
							<Form.Field>
								<Input
									name='email'
									value={this.state.email}
									onChange={this.onChange}
									type='text'
									placeholder='Email Address'
								/>
							</Form.Field>
							<Button
								disabled={isInvalid}
								type='submit'
								className='btn'
								color='orange'
							>
								Reset My Password
							</Button>

							{error && <p>{error.message}</p>}
						</Form>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export const PasswordForgot = compose(withFirebase)(PasswordForgotUncomposed);
