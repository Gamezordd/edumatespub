import React from 'react';
import { withFirebase } from '../../firebase/withFirebase';
import { compose } from 'recompose';
import { Card, Grid, GridColumn, Button, Modal } from 'semantic-ui-react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { Redirect } from 'react-router-dom';
import { Plan, PaymentContainerProps, PaymentContainerState } from './types';
import { plans } from './constants';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutAction } from '../../redux';

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
																<p className='price'> $ {plan.price} </p>{' '}
															</Grid.Row>
															<Grid.Row className='hidden'> .. </Grid.Row>
															<Grid.Row>
																{' '}
																<div className='wrapper'>
																	{' '}
																	<p className='button'>
																		<button
																			onClick={e => this.startPayment(plan)}
																		>
																			{plan.button}
																		</button>{' '}
																	</p>{' '}
																</div>{' '}
															</Grid.Row>
															<Grid.Row className='hidden'> .. </Grid.Row>{' '}
														</div>
														<Grid.Row className='hidden'> .. </Grid.Row>
														<Grid.Row>
															<ul>
																<li>{plan.description} </li>
																<li>24 hour access to Student Ambassadors</li>
																<li>Explore over 150+ universities</li>
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

					<Modal
						closeOnDimmerClick={true}
						onClose={e => this.hideDimmer()}
						size='mini'
						open={this.state.checkout}
						style={{ padding: '20px' }}
						closeIcon
					>
						<h2>Pay now</h2>
						<StripeCheckout
							stripeKey={
								process.env.REACT_APP_STRIPE_PUB_LIVE_KEY
									? process.env.REACT_APP_STRIPE_PUB_LIVE_KEY
									: ''
							}
							name={this.state.currentPlan?.name}
							description={this.state.currentPlan?.description}
							token={token => this.handlePayment(token)}
							amount={this.state.currentPlan?.price}
							currency='INR'
						/>
					</Modal>
					<Modal
						closeOnDimmerClick={true}
						onClose={e => this.hideDimmer()}
						size='mini'
						open={this.state.fail}
						style={{ padding: '20px' }}
						closeIcon
					>
						<h2> ERROR </h2>
						{this.state.failMessage}
					</Modal>
					<Modal
						closeOnDimmerClick={true}
						onClose={e => this.hideDimmer()}
						size='mini'
						open={this.state.processing}
						style={{ padding: '20px' }}
						closeIcon
					>
						<h2> Processing.... </h2>
						Payment for {this.state.currentPlan?.name} plan.
						{this.state.failMessage}
					</Modal>
				</div>
			</div>
		);
	}
}

export const PaymentContainer = compose(
	withFirebase,
	connect(mapStateToProps)
)(PaymentContainerUncomposed);
