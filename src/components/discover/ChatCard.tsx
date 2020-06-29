import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import user from '../landing/assets/user.png';

interface ChatCardProps {
	details: {
		name: string;
		course: string;
		university: string;
		image: string;
		id: string;
	};
}

interface ChatCardState {}

export class ChatCard extends React.Component<ChatCardProps, ChatCardState> {
	render() {
		const { name, course, image, id } = this.props.details;
		return (
			<Card style={{ width: '10vw', textAlign: 'center' }}>
				<Card.Content>
					<Image
						src={image ? image : user}
						style={{
							objectFit: 'cover',
							borderRadius: '50%',
							height: '14vh',
							width: '14vh',
						}}
					/>
					<Card.Header>{name}</Card.Header>
					<Card.Meta>{course}</Card.Meta>
				</Card.Content>
				<Card.Content extra>
					<Button content='Chat now!' basic color='grey' size='tiny' />
				</Card.Content>
			</Card>
		);
	}
}
