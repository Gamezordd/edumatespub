import React from 'react';
import { DiscoverComponentComposed } from './index';
import { withFirebase } from '../../firebase/withFirebase';
import { DiscoverContainerProps } from './interfaces';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state: any) => {
	return {
		universities: state.universities,
		isLoggedIn: state.user.isLoggedIn,
	};
};

class DiscoverContainer extends React.Component<DiscoverContainerProps, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		if (!this.props.isLoggedIn) return <Redirect to='/login' />;

		return (
			<div style={{ paddingTop: '100px' }}>
				<DiscoverComponentComposed uniList={this.props.universities} />
			</div>
		);
	}
}

export const DiscoverContainerComposed = compose(
	withFirebase,
	connect(mapStateToProps, null)
)(DiscoverContainer);
