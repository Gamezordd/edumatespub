import React from 'react';
import { withFirebase } from '../../firebase/withFirebase';
import { compose } from 'recompose';
import {
	Card,
	Grid,
	GridColumn,
	Button,
	Modal,
	Message,
	Icon,
} from 'semantic-ui-react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { Redirect } from 'react-router-dom';
import { Plan, PaymentContainerProps, PaymentContainerState } from './types';
import { plans } from './constants';
import axios from 'axios';
import { connect } from 'react-redux';

import './payments.css';

const POST_URL =
	'https://us-central1-mpfirebaseproject-7ff28.cloudfunctions.net/api/payment';

const mapStateToProps = (state: any) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userId: state.user.uid,
	};
};

class PaymentContainerUncomposed extends React.Component<
	PaymentContainerProps,
	PaymentContainerState
> {
	constructor(props: any) {
		super(props);
		this.state = { checkout: false };
	}

	hideDimmer = () => {
		this.setState({ checkout: false });
	};

	handlePayment = (token: Token) => {
		this.setState({
			...this.state.currentPlan,
			checkout: false,
			processing: true,
		});
		axios
			.post(POST_URL, {
				description: this.state.currentPlan?.description,
				duration: this.state.currentPlan?.duration,
				token: token,
				userId: this.props.userId,
				name: this.state.currentPlan?.name,
				amount: this.state.currentPlan?.price,
			})
			.then(data => {
				this.setState({ done: true });
			})
			.catch(data => {
				this.setState({
					fail: true,
					failMessage: `${this.state.failMessage}`,
					checkout: false,
				});
				console.log(`Fail ${data}`);
			});
	};

	startPayment = (plan: Plan) => {
		this.setState({ checkout: true, currentPlan: plan });
	};

	render() {
		if (this.state.done) return <Redirect to='/success' />;

		if (!this.props.isLoggedIn) return <Redirect to='/' />;

		return (
			<div className='bg'>
				<h1 className='Heading'> Choose your plan : </h1>
				<div>
					<div
						className='status'
						style={{
							width: '80vw',
							marginLeft: '10vw',
							marginTop: '5vh',
						}}
					>
						<Message success icon='gift'>
							<Icon name='gift' />
							<Message.Content>
								<Message.Header>
									You are eligible for free membership!
								</Message.Header>
								<p style={{ color: 'green', fontSize: '1rem' }}>
									We have awarded our first 100 users free membership till the
									date of 1st July, 2021.
								</p>
							</Message.Content>
						</Message>
					</div>
					<div className='cardHolder'>
						<Card.Group stackable itemsPerRpw={3}>
							{plans.map(plan => (
								<div className='eachcard'>
									<Card fluid>
										<Card.Content className='paycard'>
											<Grid>
												<Grid.Row>
													<Grid.Column width={16}>
														{' '}
														<div className='blackbg'>
															<Grid.Row className='hidden'> .. </Grid.Row>
															<Grid.Row className='hidden'> .. </Grid.Row>
															<Grid.Row>
																<p className='planname'> {plan.name} </p>{' '}
															</Grid.Row>
															<Grid.Row className='hidden'> .. </Grid.Row>
															<Grid.Row>
																<p className='price'> $ {plan.price / 100} </p>
																{'per month'}
															</Grid.Row>
															<Grid.Row className='hidden'> .. </Grid.Row>
															<Grid.Row className='hidden'> .. </Grid.Row>{' '}
														</div>
														<Grid.Row className='hidden'> .. </Grid.Row>
														<Grid.Row>
															<ul>
																<li>{plan.description} </li>
																<li>
																	Unrestricted access to all university
																	representatives.
																</li>
																<li>{plan.description2} </li>
															</ul>
														</Grid.Row>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										</Card.Content>
									</Card>
								</div>
							))}{' '}
						</Card.Group>
					</div>
				</div>
			</div>
		);
	}
}

export const PaymentContainer = compose(
	withFirebase,
	connect(mapStateToProps)
)(PaymentContainerUncomposed);
