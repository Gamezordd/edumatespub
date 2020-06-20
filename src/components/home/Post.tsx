import React from 'react';
import { Icon, Card, Image, Button } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({
	liked: state.user.userLikes,
});

class PostUncomposed extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { liked: this.props.liked.includes(this.props.post.id) };
	}

	liker = () => {
		this.setState({ liked: !this.state.liked });
	};

	render() {
		return (
			<div id={this.props.post.id} style={{ marginTop: '5vh' }}>
				<Card centered fluid style={{ maxWidth: '60vw' }}>
					<Card.Content>
						<Image
							src={process.env.PUBLIC_URL + '/favicon.ico'}
							size='mini'
							floated='left'
						/>
						<Card.Header>{this.props.post.userId}</Card.Header>
						<Card.Meta>
							{this.props.post.universityId},
							{this.props.post.createdAt.toDate().toString()}
						</Card.Meta>
						{this.props.post.files && <Image src={this.props.post.files[0]} />}
						<Card.Description>{this.props.post.content}</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Icon
							name='like'
							color={this.state.liked ? 'orange' : undefined}
							onClick={() => this.liker()}
						/>
						{this.props.post.likeCount}
					</Card.Content>
				</Card>
			</div>
		);
	}
}

export const Post = compose<any, any>(
	withFirebase,
	connect(mapStateToProps)
)(PostUncomposed);
