import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutAction } from '../../redux';
import { compose } from 'recompose';

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logoutAction()),
});

class LogOutUncomposed extends Component<{ logout: typeof logoutAction }> {
	constructor(props: any) {
		super(props);
	}

	render() {
		this.props.logout();
		return <Redirect to='/' />;
	}
}

export const LogOut = compose(connect(null, mapDispatchToProps))(
	LogOutUncomposed
);
