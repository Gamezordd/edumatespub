import React from 'react';
import { compose } from 'recompose';
import { InfiniteScrollProps, InfiniteScrollState } from './types';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { fetchInitialPosts, appendPosts, storeScroll } from '../../redux';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import { Grid } from 'semantic-ui-react';
import { Dispatch, AnyAction } from 'redux';
import { Post } from './Post';
import { Redirect } from 'react-router-dom';
import { CreatePost } from './CreatePost';

const mapStateToProps = (state: any) => ({
	posts: state.posts.posts,
	lastFetched: state.posts.lastFetched,
	scroll: state.posts.yScroll,
	favourites: state.user.favouriteUnis,
	isLoggedIn: state.user.isLoggedIn,
	isAmbassador: state.user.isAmbassador,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	fetch: (posts: any[], lastFetched: string) =>
		dispatch(fetchInitialPosts(posts, lastFetched)),
	append: (posts: any[], lastFetched: string) =>
		dispatch(appendPosts(posts, lastFetched)),
	saveScroll: (scroll: number) => dispatch(storeScroll(scroll)),
});

class InfiniteScrollUncomposed extends React.Component<
	InfiniteScrollProps,
	InfiniteScrollState
> {
	constructor(props: InfiniteScrollProps) {
		super(props);
		this.state = { hasMore: true, scroll: 0, authFail: false };
		if (this.props.lastFetched === null) {
			this.initiate();
		}
	}

	infiScrollRef = React.createRef<InfiniteScrollComponent>();

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

	componentDidMount() {
		if (!this.props.firebase.isLoggedIn()) this.setState({ authFail: true });
		window.scrollTo(0, this.props.scroll);
	}

	componentWillUnmount() {
		this.props.saveScroll(window.pageYOffset);
	}

	render() {
		if (!this.props.isLoggedIn || this.state.authFail)
			return <Redirect to='/login' />;
		return (
			<div
				style={{
					marginTop: '10vh',
				}}
			>
				<Grid centered>
					<Grid.Column style={{ padding: '5vw' }}>
						{this.props.isAmbassador && <CreatePost />}
						<InfiniteScrollComponent
							style={{ overflowX: 'hidden' }}
							ref={this.infiScrollRef}
							dataLength={this.props.posts.length}
							next={this.append}
							hasMore={this.state.hasMore}
							loader='Fetching posts....'
							endMessage={
								<p style={{ textAlign: 'center', color: 'rgba(F,F,F,0.2)' }}>
									<b>You are all caught up!</b>
								</p>
							}
							refreshFunction={this.initiate}
							pullDownToRefresh
							pullDownToRefreshContent={
								<h3 style={{ textAlign: 'center', color: 'rgba(F,F,F,0.2)' }}>
									&#8595; Pull down to refresh
								</h3>
							}
							releaseToRefreshContent={
								<h3 style={{ textAlign: 'center', color: 'rgba(F,F,F,0.2)' }}>
									&#8593; Release to refresh
								</h3>
							}
							initialScrollY={this.props.scroll}
						>
							{this.props.posts.map(post => (
								<Post post={post} />
							))}
						</InfiniteScrollComponent>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export const InfiniteScroll = compose<any, any>(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(InfiniteScrollUncomposed);
