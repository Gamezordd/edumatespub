import React from 'react';
import { compose } from 'recompose';
import { InfiniteScrollProps, InfiniteScrollState } from './types';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { fetchInitialPosts, appendPosts } from '../../redux';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import { Card } from 'semantic-ui-react';
import { Dispatch, AnyAction } from 'redux';

const mapStateToProps = (state: any) => ({
	posts: state.posts.posts,
	lastFetched: state.posts.lastFetched,
	favourites: state.user.favouriteUnis,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	fetch: (posts: any[], lastFetched: string) =>
		dispatch(fetchInitialPosts(posts, lastFetched)),
	append: (posts: any[], lastFetched: string) =>
		dispatch(appendPosts(posts, lastFetched)),
});

class InfiniteScrollUncomposed extends React.Component<
	InfiniteScrollProps,
	InfiniteScrollState
> {
	constructor(props: InfiniteScrollProps) {
		super(props);
		console.log('In cont', this.props.favourites);
		this.state = { hasMore: true };
		if (this.props.lastFetched === null) {
			this.initiate();
		}
	}

	initiate = async () => {
		const posts = await this.getPosts();
		const lastFetched = posts[posts.length - 1]
			? posts[posts.length - 1].createdAt
			: null;
		this.props.fetch(posts, lastFetched);
	};

	append = async () => {
		const posts = await this.getPosts();
		if (posts.length === 0) return;
		const lastFetched = posts[posts.length - 1].createdAt;
		this.props.append(posts, lastFetched);
	};

	getPosts = async () => {
		const { favourites, lastFetched } = this.props;
		if (favourites.length === 0 || this.state.hasMore === false) {
			this.setState({ ...this.state, ...{ hasMore: false } });
			return [];
		}
		const posts = await this.props.firebase.getPosts(lastFetched, favourites);
		if (posts.length < 10) {
			this.setState({ ...this.state, ...{ hasMore: false } });
		}
		return posts;
	};

	render() {
		return (
			<div>
				<InfiniteScrollComponent
					dataLength={this.props.posts.length}
					next={this.append}
					hasMore={this.state.hasMore}
					loader='Fetching posts....'
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>You are all caught up!</b>
						</p>
					}
					refreshFunction={this.initiate}
					pullDownToRefresh
					pullDownToRefreshContent={
						<h3 style={{ textAlign: 'center' }}>
							&#8595; Pull down to refresh
						</h3>
					}
					releaseToRefreshContent={
						<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
					}
				>
					{this.props.posts.map(post => (
						<Card style={{ marginTop: '10vh' }}>
							<h2>{post.title}</h2>
							<div className='AuthorName'>{post.userId}</div>
							<div className='CreatedAt'>{post.createdAt.toString()}</div>
							{post.files === undefined ? (
								<div></div>
							) : (
								<div className='image'>
									<img src={post.files[0]} alt='post.title' />
								</div>
							)}
							<div className='Content'>{post.content}</div>
						</Card>
					))}
				</InfiniteScrollComponent>
			</div>
		);
	}
}

export const InfiniteScroll = compose<any, any>(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(InfiniteScrollUncomposed);
