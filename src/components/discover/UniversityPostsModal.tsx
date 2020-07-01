import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { Firebase } from '../../firebase';
import { Button, Modal, Grid } from 'semantic-ui-react';
import { Post } from '../home/Post';
import { LoadingContainer } from '../maps';
import _ from 'lodash';
import { EmptyContainer } from './EmptyContainer';
interface IProps {
	buttonFloated: 'left' | 'right' | undefined;
	firebase?: Firebase;
	universityId: string;
	buttonText: string;
}

interface IState {
	isLoading: boolean;
	isModalOpen: boolean;
	hasMore: boolean;
	posts: any[];
	lastFetched: string | null;
	debounced: any;
}

const initialState = {
	isLoading: false,
	isModalOpen: false,
	hasMore: true,
	posts: [],
	lastFetched: null,
};

class UniversityPostsModalBasic extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			...initialState,
			debounced: _.debounce(() => this.fetchPosts(), 2000, {
				leading: true,
				trailing: false,
			}),
		};
	}

	handleScroll = (e: any) => {
		const { scrollTop, clientHeight, scrollHeight } = e.target;
		if (scrollHeight - clientHeight - 800 <= scrollTop) {
			this.state.debounced();
		}
	};

	async fetchPosts() {
		if (this.state.hasMore) {
			this.setState({ isLoading: true });
			if (!this.props.firebase)
				return console.error('no firebase instance found');
			const posts = await this.props.firebase.getPosts(this.state.lastFetched, [
				this.props.universityId,
			]);
			this.setState({
				posts: this.state.posts.concat(posts),
				lastFetched: posts[posts.length - 1]
					? posts[posts.length - 1].createdAt
					: null,
			});
			this.handleListener(true);
			this.setState({ isLoading: false });
			if (posts.length < 10) {
				this.setState({ hasMore: false });
			}
		}
	}

	handleListener(add: boolean) {
		if (add) {
			return document
				.getElementById('modalol')
				?.addEventListener('scroll', e => {
					this.handleScroll(e);
				});
		} else {
			return document.removeEventListener('scroll', e => this.handleScroll(e));
		}
	}

	renderPosts() {
		if (this.state.posts.length === 0 && !this.state.isLoading)
			return <EmptyContainer />;
		else if (this.state.posts.length > 0) {
			return this.state.posts.map(post => {
				return <Post post={post} />;
			});
		}
	}

	render() {
		return (
			<div>
				<Button
					floated={this.props.buttonFloated}
					size='tiny'
					color='grey'
					basic
					onClick={() => {
						this.setState({ isModalOpen: true });
						this.fetchPosts();
					}}
				>
					{this.props.buttonText}
				</Button>
				<Modal
					open={this.state.isModalOpen}
					onClose={() => {
						this.setState({ ...initialState });
						this.handleListener(false);
					}}
				>
					<Modal.Header>
						University Posts:
						<Button secondary basic floated='right' size='small'>
							Details
						</Button>
					</Modal.Header>
					<Modal.Content scrolling id='modalol'>
						<Grid centered>
							<Grid.Column width={16}>
								<div
									style={{
										overflowX: 'hidden',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									{this.state.isModalOpen ? this.renderPosts() : null}
									{this.state.isLoading ? <LoadingContainer /> : null}
								</div>
							</Grid.Column>
						</Grid>
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}

export const UniversityPostsModal: React.ComponentClass<IProps> = compose<
	any,
	any
>(
	withFirebase,
	connect(null, null)
)(UniversityPostsModalBasic);
