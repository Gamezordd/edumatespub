import React from 'react';
import { Icon, Card, Image } from 'semantic-ui-react';
import './Post.css';

export class Post extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

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
						<Icon name='like' aria-label={this.props.post.likeCount} />
						{this.props.post.likeCount}
					</Card.Content>
				</Card>
			</div>
		);
	}
}
