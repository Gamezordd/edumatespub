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
import { ChatList } from './ChatList';
import { ActualChat } from './ActualChat';

export interface ChatBoxProps {}

export interface ChatBoxState {}

export class ChatBox extends React.Component<ChatBoxProps, ChatBoxState> {
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
			<Grid>
				<ChatList />
				<ActualChat />
			</Grid>
		);
	}
}
