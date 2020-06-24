import React from 'react';
import { Grid } from 'semantic-ui-react';
import './allstyle.css';
import { ChatList } from './ChatList';
import { Chat } from './Chat';

export interface ChatBoxProps {}

export interface ChatBoxState {}

export class ChatBox extends React.Component<ChatBoxProps, ChatBoxState> {
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
			<Grid>
				<ChatList />
				<Chat />
			</Grid>
		);
	}
}
