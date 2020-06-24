import React from 'react';
import { Feed } from 'semantic-ui-react';
import user from '../landing/assets/user.png';
import './allstyle.css';

interface ChatListEntryProps {}

interface ChatListEntryState {}

export class ChatListEntry extends React.Component<
	ChatListEntryProps,
	ChatListEntryState
> {
	//state = { :  }
	writetocon = () => {
		console.log('Chat was pressed');
	};
	formatDescription = (description: string) => {
		if (description.length > 100) {
			return description.substring(0, 25) + '...';
		} else {
			return description;
		}
	};
	render() {
		return (
			<Feed.Event onClick={this.writetocon}>
				<Feed.Label image={user} />
				<Feed.Content>
					<Feed.User>Tanya</Feed.User>
					<Feed.Summary>
						{this.formatDescription('Hi there')}
						<Feed.Date style={{ float: 'right' }}>just now</Feed.Date>
					</Feed.Summary>
				</Feed.Content>
			</Feed.Event>
		);
	}
}
