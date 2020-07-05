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
	isMobile: boolean;
}

interface ChatListState {
	chats: any[];
}

const desktopStyle = {
	marginTop: '20vh',
	height: '70vh',
	width: '30%',
	overflowX: 'hidden',
};

const mobileStyle = {
	marginTop: '15vh',
	height: '80vh',
	width: '95%',
	overflowX: 'hidden',
};

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
		const { isMobile } = this.props;
		return (
			<Card style={isMobile ? mobileStyle : desktopStyle}>
				<Card.Content>
					<Card.Header content='Chats' />
					<Input icon='search' style={{ width: '100%' }} />
				</Card.Content>

				<div style={{ overflowX: 'scroll' }}>
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
				</div>
			</Card>
		);
	}
}

export const ChatList = compose(withFirebase)(ChatListUncomposed);
