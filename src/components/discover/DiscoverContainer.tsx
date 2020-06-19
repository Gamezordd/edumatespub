import React from 'react';
import { DiscoverComponentComposed } from './index';
//import {universities} from './constants'
import { withFirebase } from '../../firebase/withFirebase';
import{ DiscoverContainerProps } from './interfaces';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
	return {
		universities: state.universities,
	};
};

class DiscoverContainer extends React.Component<DiscoverContainerProps, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
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
