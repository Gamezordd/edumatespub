import React from 'react';
import {
	Grid,
	Segment,
	Card,
	Header,
	Feed,
	Input,
	Divider,
} from 'semantic-ui-react';
import user from '../landing/assets/user.png';
import './allstyle.css';

export interface EachChatProps {}

export interface EachChatState {}

export class EachChat extends React.Component<EachChatProps, EachChatState> {
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
