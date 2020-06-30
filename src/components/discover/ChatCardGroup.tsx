import React from 'react';
import { Card } from 'semantic-ui-react';
import { ChatCard } from './ChatCard';

interface ChatCardGroupProps {
	data: any[];
}

interface ChatCardGroupState {}

export class ChatCardGroup extends React.Component<
	ChatCardGroupProps,
	ChatCardGroupState
> {
	//state = { :  }
	render() {
		if (this.props.data.length === 0)
			return <p>We are looking for people to fill this page</p>;
		return (
			<Card.Group style={{ padding: '2%' }} stackable>
				{this.props.data.map(item => {
					return <ChatCard details={item} />;
				})}
			</Card.Group>
		);
	}
}
