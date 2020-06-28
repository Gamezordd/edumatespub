import React from 'react';
import { Card, Image, Grid, Button } from 'semantic-ui-react';
import user from '../landing/assets/user.png';
import { AChatCard } from './AChatCard';

interface AChatCardGroupProps {}

interface AChatCardGroupState {}

export class AChatCardGroup extends React.Component<
	AChatCardGroupProps,
	AChatCardGroupState
> {
	//state = { :  }
	render() {
		return (
			<Card.Group style={{ padding: '2%' }} stackable>
				<AChatCard />
				<AChatCard />
				<AChatCard />
				<AChatCard />
				<AChatCard />
				<AChatCard />
				<AChatCard />
			</Card.Group>
		);
	}
}
