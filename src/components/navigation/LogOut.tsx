import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutAction } from '../../redux';
import { compose } from 'recompose';
import { Firebase } from '../../firebase';
import { withFirebase } from '../../firebase/withFirebase';

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logoutAction()),
});

class LogOutUncomposed extends Component<{
	logout: typeof logoutAction;
	firebase: Firebase;
}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		this.props.logout();
		this.props.firebase.signOut();
		return <Redirect to='/' />;
	}
}

export const LogOut = compose(
	connect(null, mapDispatchToProps),
	withFirebase
)(LogOutUncomposed);
