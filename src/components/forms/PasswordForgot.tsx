import _ from 'lodash';
import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { ChangeEvent } from 'react';
import {
	Input,
	Button,
	Form,
	Grid,
	Image,
	Transition,
} from 'semantic-ui-react';
import './allforms.css';
import logo from '../landing/assets/logo2.png';
import { PasswordForgotProps, PasswordForgotState } from './types';

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
			error: '',
			animationDone: false,
		};

		this.makeVisible();
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

	makeVisible = () => {
		setTimeout(() => this.setState({ ...this.state, animationDone: true }), 10);
	};

	render() {
		const { email, error } = this.state;

		const isInvalid = email === '';
		return (
			<Grid
				textAlign='center'
				style={{ height: '100vh' }}
				verticalAlign='middle'
			>
				<Grid.Column style={{ maxWidth: 600 }}>
					<Transition animation='zoom' visible={this.state.animationDone}>
						<Form
							onSubmit={this.onSubmit}
							style={{
								backgroundColor: 'white',
								border: '3px solid #f3f3f3',
								borderRadius: '25px',
								textAlign: 'left',
								padding: '5%',
								boxShadow:
									'0 0 0 1px #d4d4d5,0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.15)',
							}}
						>
							<Image size='medium' src={logo} centered />
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
								style={{ width: '100%' }}
							>
								Reset My Password
							</Button>

							{error && <p>{error.message}</p>}
						</Form>
					</Transition>
				</Grid.Column>
			</Grid>
		);
	}
}

export const PasswordForgot = compose(withFirebase)(PasswordForgotUncomposed);
