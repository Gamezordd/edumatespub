import React from 'react';
import { Icon, Card, Image, Transition } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../redux/ActionCreators';
import { PostProps, PostState } from './types';
import _ from 'lodash';

const dateOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hour12: false,
};

const mapStateToProps = (state: any) => ({
	liked: state.user.userLikes,
});

const mapDispatchToProps = (dispatch: any) => ({
	likeLocal: (post: string) => dispatch(addLike(post)),
	unlikeLocal: (post: string) => dispatch(removeLike(post)),
});

class PostUncomposed extends React.Component<PostProps, PostState> {
	constructor(props: any) {
		super(props);
		console.log(this.props.liked);
		this.state = {
			liked: this.props.liked.includes(this.props.post.id),
			animationDone: false,
		};
		this.makeVisible();
	}

	toggler = () => {
		this.setState({ liked: !this.state.liked });
		this.spamHandler(this.state.liked);
	};

	spamHandler = _.debounce(
		(liked: boolean) => {
			if (liked) {
				this.unlike();
			} else {
				if (this.props.liked.includes(this.props.post.id)) return;
				this.like();
			}
		},
		1200,
		{
			trailing: true,
		}
	);

	like = async () => {
		console.log('Storing like');
		this.props.likeLocal(this.props.post.id);
		await this.props.firebase.like(this.props.post.id);
		this.setState({ liked: true });
	};

	unlike = async () => {
		console.log('Deleting like');
		this.props.unlikeLocal(this.props.post.id);
		await this.props.firebase.unlike(this.props.post.id);
		this.setState({ liked: false });
	};

	makeVisible = () => {
		setTimeout(() => this.setState({ ...this.state, animationDone: true }), 10);
	};

	render() {
		const { post } = this.props;
		const date = new Intl.DateTimeFormat(
			post.createdAt.toDate(),
			dateOptions
		).format(post.createdAt);
		return (
			<div id={post.id} style={{ marginTop: '5vh', padding: '5px' }}>
				<Transition animation='fade right' visible={this.state.animationDone}>
					<Card centered fluid style={{ maxWidth: '720px' }}>
						<Card.Content>
							<Image
								src={process.env.PUBLIC_URL + '/favicon.ico'}
								size='mini'
								floated='left'
							/>
							<Card.Header style={{ fontSize: '1em' }}>
								{post.userId}
							</Card.Header>
							<Card.Meta style={{ fontSize: '1em' }}>
								{post.universityId}, {date}
							</Card.Meta>
						</Card.Content>
						<Card.Content>
							<Card.Header>{post.title}</Card.Header>
							{post.files && <Image src={this.props.post.files[0]} />}
							<Card.Description>{post.content}</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Icon
								name='like'
								color={this.state.liked ? 'orange' : undefined}
								onClick={() => this.toggler()}
							/>
							{post.likeCount}
						</Card.Content>
					</Card>
				</Transition>
			</div>
		);
	}
}

export const Post = compose<PostProps, any>(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(PostUncomposed);
