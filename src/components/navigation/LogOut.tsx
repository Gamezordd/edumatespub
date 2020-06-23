import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutAction, clearPosts } from '../../redux';
import { compose } from 'recompose';
import { Firebase } from '../../firebase';
import { withFirebase } from '../../firebase/withFirebase';

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logoutAction()),
	clearPosts: () => dispatch(clearPosts),
});

class LogOutUncomposed extends Component<{
	logout: typeof logoutAction;
	clearPosts: typeof clearPosts;
	firebase: Firebase;
}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		this.props.logout();
		this.props.clearPosts();
		this.props.firebase.doSignOut();
		return <Redirect to='/' />;
	}
}

export const LogOut = compose(
	connect(null, mapDispatchToProps),
	withFirebase
)(LogOutUncomposed);
