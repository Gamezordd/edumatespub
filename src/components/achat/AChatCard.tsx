import React from 'react';
import { Card, Image, Grid } from 'semantic-ui-react';
import user from '../landing/assets/user.png';

interface AChatCardProps {}

interface AChatCardState {}

export class AChatCard extends React.Component<AChatCardProps, AChatCardState> {
	// state = { :  }
	render() {
		return (
			<Card style={{ width: '10vw', textAlign: 'center' }}>
				<Card.Content>
					<Image src={user} size='small' />
					<Card.Header>Tanya Sharma</Card.Header>
					<Card.Meta>Information Technology</Card.Meta>
				</Card.Content>
			</Card>
		);
	}
}
