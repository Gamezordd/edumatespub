import React from 'react';
import { Grid } from 'semantic-ui-react';
import './allstyle.css';
import { ChatList } from './ChatList';
import { Chat } from './Chat';

export interface ChatBoxProps {}

export interface ChatBoxState {
	selectedChat: any | undefined;
}

export class ChatBox extends React.Component<ChatBoxProps, ChatBoxState> {
	constructor(props: ChatBoxProps) {
		super(props);
		this.state = {
			selectedChat: undefined,
		};
	}

	formatMessage = (message: string) => {
		if (message.length > 100) {
			return message.substring(0, 25) + '...';
		} else {
			return message;
		}
	};

	handleChatSelect = (chat: any) => {
		console.log('Selecting', chat);
		this.setState({ selectedChat: chat });
	};

	render() {
		return (
			<Grid>
				<ChatList selectChat={this.handleChatSelect} />
				<Chat selectedChat={this.state.selectedChat} />
			</Grid>
		);
	}
}
