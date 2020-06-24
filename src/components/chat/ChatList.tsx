import React from 'react';
import { Card, Feed, Input, Divider } from 'semantic-ui-react';
import './allstyle.css';
import { ChatListEntry } from './ChatListEntry';
export interface ChatListProps {}

export interface ChatListState {}

export class ChatList extends React.Component<ChatListProps, ChatListState> {
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
					<ChatListEntry />
					<Divider />
					<ChatListEntry />
					<Divider />
					<ChatListEntry />
					<Divider />
					<ChatListEntry />
					<Divider />
					<ChatListEntry />
					<Divider />
					<ChatListEntry />
				</Feed>
			</Card>
		);
	}
}
