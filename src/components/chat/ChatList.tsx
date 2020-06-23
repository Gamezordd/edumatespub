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
import { EachChat } from './EachChat';
export interface ChatListProps {}

export interface ChatListState {}

export class ChatList extends React.Component<ChatListProps, ChatListState> {
	//state = { :  }
	render() {
		return (
			<Card
				style={{
					marginTop: '20vh',
					maxHeight: '70vh',
					width: '30vw',
					overflow: 'auto',
				}}
				centered
			>
				<Card.Content>
					<Card.Header>ALL CHATS</Card.Header>
				</Card.Content>
				<Card.Content>
					<Input icon='search' style={{ width: '100%' }}></Input>
				</Card.Content>
				<Divider />
				<Feed style={{ padding: '2%' }}>
					<EachChat />
					<Divider />
					<EachChat />
					<Divider />
					<EachChat />
					<Divider />
					<EachChat />
					<Divider />
					<EachChat />
					<Divider />
					<EachChat />
				</Feed>
			</Card>
		);
	}
}
