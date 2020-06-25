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

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		if (!this.props.isLoggedIn) return <Redirect to='/login' />;
		return (
			<div style={{ paddingTop: '100px' }}>
				<DiscoverComponentComposed uniList={this.props.universities} onlyFavourites={this.props.onlyFavourites} />
			</div>
		);
	}
}

export const DiscoverContainerComposed: React.ComponentClass<DiscoverContainerProps, any> = compose<any, any>(
	withFirebase,
	connect(mapStateToProps, null)
)(DiscoverContainer);
