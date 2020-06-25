import React from 'react';
import { Card, Icon, Dimmer, Loader, Input } from 'semantic-ui-react';
import './allstyle.css';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ChatMessage } from './ChatMessage';
import _ from 'lodash';
import { relative } from 'path';

interface ChatProps {
	selectedChat: any;
	firebase: Firebase;
	name: string;
}

interface ChatState {
	newMessage: string;
	messages: any[];
	isLoading: boolean;
}

const mapStateToProps = (state: any) => ({
	name: state.user.details.name,
});

class ChatComponent extends React.Component<ChatProps, ChatState> {
	constructor(props: ChatProps) {
		super(props);
		console.log('In contructor:', this.props);
		this.state = {
			newMessage: '',
			messages: [],
			isLoading: false,
		};
	}

	chatEndRef = React.createRef<HTMLDivElement>();

	inititate = async () => {
		console.log('Initiating,', this.props.selectedChat);
		if (this.props.selectedChat === undefined) return;
		this.setState({ ...this.state, ...{ isLoading: true } });
		await this.props.firebase
			.getChat(this.props.selectedChat.chat)
			.then(messages => {
				console.log('data', messages);
				this.setState({
					...this.state,
					...{ messages: messages, isLoading: false },
				});
				console.log('onInititate', this.state.messages);
			});

		this.props.firebase
			.getChatRef(this.props.selectedChat.chat)
			.limitToLast(1)
			.on('child_added', snapshot => {
				//Conditional throws last child fetched twice
				if (
					snapshot.key ===
					this.state.messages[this.state.messages.length - 1].id
				)
					return;
				this.setState({
					...this.state,
					...{
						messages: [
							...this.state.messages,
							...[{ ...snapshot.val(), ...{ id: snapshot.key } }],
						],
					},
				});
			});
	};

	scrollToBottom = () => {
		this.chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	componentDidUpdate() {
		if (this.state.isLoading === true) return;
		const { selectedChat } = this.props;
		console.log('Update triggered', this.state.messages);
		console.log();
		if (this.state.messages.length === 0 && selectedChat !== undefined) {
			this.inititate();
		}
		this.scrollToBottom();
	}

	async componentDidMount() {
		document
			.getElementById('newMessage')
			?.addEventListener('keypress', sendEvent => {
				if (
					sendEvent.keyCode === 13 &&
					this.state.newMessage != '' &&
					this.props.selectedChat
				) {
					this.props.firebase.sendMessage({
						content: this.state.newMessage,
						name: this.props.name,
						chatId: this.props.selectedChat.chat,
						recieverName: this.props.selectedChat.name,
						reciever: this.props.selectedChat.userId,
					});
					this.setState({ newMessage: '' });
				}
			});
		this.scrollToBottom();
	}

	handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ newMessage: event.target.value });
	};

	render() {
		const { selectedChat } = this.props;
		console.log('Selected', selectedChat);
		const { isLoading } = this.state;
		const defaultView = (
			<div>
				<h3>Please Select a user</h3>
			</div>
		);

		return (
			<Card
				style={{
					marginTop: '20vh',
					maxHeight: '70vh',
					width: '50vw',
					overflow: 'auto',
				}}
				centered
			>
				<Card.Content style={{ maxHeight: '10vh' }}>
					<Card.Header style={{ padding: 0 }}>
						{selectedChat ? selectedChat.name : null}{' '}
					</Card.Header>
				</Card.Content>
				<Card.Content style={{ overflow: 'auto' }}>
					{selectedChat
						? this.state.messages.map(message => (
								<ChatMessage
									id={message.id}
									recieved={message.sender == selectedChat.userId}
									content={message.content}
								/>
						  ))
						: defaultView}
					<div
						id='scrollRef'
						ref={this.chatEndRef}
						style={{ verticalAlign: 'base' }}
					>
						<input hidden />
					</div>
				</Card.Content>
				<Card.Content style={{ maxHeight: '10vh' }}>
					<Input
						id='newMessage'
						style={{ width: '85%' }}
						onChange={this.handleOnChange}
						placeholder='Message'
						value={this.state.newMessage ? this.state.newMessage : ''}
					/>
					<Icon name='send' />
					<Icon name='thumbs up' />
				</Card.Content>
			</Card>
		);
	}
}

export const Chat = compose<ChatProps, any>(
	withFirebase,
	connect(mapStateToProps)
)(ChatComponent);
