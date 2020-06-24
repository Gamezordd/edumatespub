import React from 'react';
import { Grid } from 'semantic-ui-react';
import './allstyle.css';
import { ChatList } from './ChatList';
import { Chat } from './Chat';

export interface ChatBoxProps {
	chats: any;
	selfUid: string;
}

export interface ChatBoxState {
	selectedUser: firebase.firestore.DocumentData | undefined;
}

export class ChatBox extends React.Component<ChatBoxProps, ChatBoxState> {
	constructor(props: ChatBoxProps) {
		super(props);
		this.state = {
			selectedUser: undefined,
		};
	}
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

	handleUserSelect = (user: any) => {
		return this.setState({ selectedUser: user });
	};

	extractContacts(data: { uid: string }[]) {
		const contacts = data.map(chat => {
			return chat.uid;
		});
		return contacts;
	}

	extractMessages(data: { uid: string; messages: object[] }[]) {
		var obj = {};
		data.map(chat => {
			obj = { ...obj, [chat.uid]: [chat.messages] };
			return null;
		});
		return obj;
	}

	render() {
		const { chats } = this.props;
		const { selectedUser } = this.state;

		return (
			<Grid>
				<ChatList
					contacts={this.extractContacts(chats)}
					selectUser={this.handleUserSelect}
				/>
				<Chat
					messages={this.extractMessages(chats)}
					selectedUser={selectedUser}
					selfUid={this.props.selfUid}
				/>
			</Grid>
		);
	}
}
