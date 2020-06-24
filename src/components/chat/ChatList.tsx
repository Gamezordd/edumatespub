import React from 'react';
import { Feed, Input, Divider, Segment, Grid } from 'semantic-ui-react';
import './allstyle.css';
import { ChatListEntry } from './ChatListEntry';

export interface ChatListProps {
	contacts: string[];
	selectUser: (uid: string) => void;
}

export interface ChatListState {}

export class ChatList extends React.Component<ChatListProps, ChatListState> {
	render() {
		return (
			<Segment
				style={{
					marginTop: '20vh',
					height: '70vh',
					width: '30vw',
					overflow: 'auto',
				}}
			>
				<Grid>
					<Grid.Row style={{ paddingLeft: '10px' }}>
						<h2>All Chats</h2>
					</Grid.Row>
					<Divider style={{ margin: 0 }} />
					<Grid.Row>
						<Grid.Column>
							<Input icon='search' style={{ width: '100%' }} />
							<Feed>
								{this.props.contacts.map((uid: string) => {
									return (
										<div>
											<ChatListEntry
												id={uid}
												clickHandler={this.props.selectUser}
											/>
											<Divider />
										</div>
									);
								})}
							</Feed>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
	/*render() {
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
					{this.props.contacts.map((uid: string) => {
						return(
							<div>
							<ChatListEntry id={uid} />
							<Divider/>
							</div>
						);
					})}
				</Feed>
				</Card>
		);

	}*/
}
