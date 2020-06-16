import React from 'react';
import { compose } from 'recompose';
import { InfiniteScrollProps, InfiniteScrollState } from './types';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { fetchInitialPosts, appendPosts } from '../../redux';

const mapStateToProps = (state: any) => ({
	posts: state.posts.posts,
	lastFetched: state.posts.lastFetched,
});

const mapDispatchToProps = {
	fetchInitialPosts,
	appendPosts,
};

class InfiniteScrollUncomposed extends React.Component<
	InfiniteScrollProps,
	InfiniteScrollState
> {
	constructor(props: InfiniteScrollProps) {
		super(props);
	}
}

export const InfiniteScroll = compose<InfiniteScrollProps, InfiniteScrollState>(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(InfiniteScrollUncomposed);
