import React, { Children } from 'react';
import { Feed, Input, Divider, Segment, Grid, Card } from 'semantic-ui-react';
import './allstyle.css';
import { ChatListEntry } from './ChatListEntry';
import { Firebase } from '../../firebase';
import { compose } from 'redux';
import { withFirebase } from '../../firebase/withFirebase';
import _ from 'lodash';

interface ChatListProps {
	firebase: Firebase;
	selectChat: (chat: any) => void;
}

interface ChatListState {
	chats: any[];
}

class ChatListUncomposed extends React.Component<ChatListProps, ChatListState> {
	constructor(props: ChatListProps) {
		super(props);
		this.state = { chats: [] };
	}

	async componentDidMount() {
		this.props.firebase.getUserChatsRef().on('child_added', snapshot => {
			this.setState({
				chats: [...this.state.chats],
				...[{ userId: snapshot.key, ...snapshot.val() }],
			});
		});

		const chats = await this.props.firebase.getUserChats();
		this.setState({
			chats: _.union(chats, this.state.chats),
		});
	}

	render() {
		return (
			<Card
				style={{
					marginTop: '20vh',
					height: '70vh',
					width: '30%',
					overflowY: 'scroll',
					overflowX: 'hidden',
				}}
			>
				<Grid>
					<Grid.Row style={{ paddingLeft: '10vh' }}>
						<h2>All Chats</h2>
					</Grid.Row>
					<Divider style={{ margin: 0 }} />
					<Grid.Row>
						<Grid.Column>
							<Input icon='search' style={{ width: '100%' }} />
							<Feed>
								{this.state.chats.map((chat: any) => {
									return (
										<Feed>
											<ChatListEntry
												id={chat.userId}
												chatDetails={chat}
												clickHandler={this.props.selectChat}
											/>
											<Divider />
										</Feed>
									);
								})}
							</Feed>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Card>
		);
	}
}

export const ChatList = compose(withFirebase)(ChatListUncomposed);
