import React from 'react';
import { compose } from 'redux';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { Firebase } from '../../firebase';
import { addChatsAction } from '../../redux';
import { Button } from 'semantic-ui-react';
interface IState {
	newMessage: boolean;
	chats: object[];
	rawMessages: Array<{
		data: { message: string; sender: string; receiver: string };
		messageId: string;
	}>;
	fetchMessages: boolean;
}

interface IProps {
	firebase: Firebase;
	user: any;
	addChats: typeof addChatsAction;
	chat: {
		messages: Array<{
			data: { message: string; sender: string; receiver: string };
			messageId: string;
		}>;
	};
}

const mapStateToProps = (state: any) => {
	return {
		user: state.user,
		chat: state.chat,
	};
};

const mapDispatchToProps = (dispatch: any) => ({
	addChats: (payload: object[]) => dispatch(addChatsAction(payload)),
});

class ChatComponent extends React.Component<IProps, IState> {
	componentDidMount() {
		const rtdbMessageRef = this.props.firebase.rtdb.ref('Chats/');
		var payload: any = [];
		rtdbMessageRef.on('child_added', snapshot => {
			if (
				snapshot.val().sender === this.props.user.uid ||
				snapshot.val().receiver === this.props.user.uid
			) {
				payload = payload.concat({
					data: snapshot.val(),
					messageId: snapshot.key,
				});
				this.setState({ rawMessages: payload, newMessage: true });
			}
		});
	}

	constructor(props: IProps) {
		super(props);
		this.state = {
			chats: Array<{
				uid: string;
				messages: { message: string; sent: boolean; messageId: string }[];
			}>(),
			newMessage: false,
			rawMessages: [],
			fetchMessages: true,
		};
	}
	updateMessages() {
		const { rawMessages } = this.state;
		var newChats: any = [];
		rawMessages.map((message, index) => {
			const receiverIndex = newChats.findIndex(
				(element: any) => element.uid === message.data.receiver
			);

			if (receiverIndex < 0) {
				if (message.data.receiver === this.props.user.uid) {
					const senderIndex = newChats.findIndex(
						(element: any) => element.uid === message.data.sender
					);
					if (senderIndex < 0) {
						newChats = newChats.concat({
							uid: message.data.sender,
							messages: [
								{
									message: message.data.message,
									sent:
										message.data.sender === this.props.user.uid
											? true
											: false,
									messageId: message.messageId,
								},
							],
						});
					} else {
						newChats[senderIndex] = {
							uid: message.data.sender,
							messages: newChats[senderIndex]['messages'].concat({
								message: message.data.message,
								sent:
									message.data.sender === this.props.user.uid
										? true
										: false,
								messageId: message.messageId,
							}),
						};
					}
				} else {
					newChats = newChats.concat({
						uid: message.data.receiver,
						messages: [
							{
								message: message.data.message,
								sent:
									message.data.sender === this.props.user.uid
										? true
										: false,
								messageId: message.messageId,
							},
						],
					});
				}
			} else {
				newChats[receiverIndex] = {
					uid: message.data.receiver,
					messages: newChats[receiverIndex]['messages'].concat({
						message: message.data.message,
						sent:
							message.data.sender === this.props.user.uid
								? true
								: false,
						messageId: message.messageId,
					}),
				};
			}
		});
		this.props.addChats(newChats);
		console.log("chats: ", newChats)
		this.setState({ newMessage: false, chats: newChats });
	}

	sendMessage(message: string, toUid: string) {
		this.props.firebase.sendChat(
			message,
			this.props.user.uid,
			toUid
		);
	}

	render() {
		const { newMessage, rawMessages } = this.state;
		if (newMessage && rawMessages.length !== 0) {
			this.updateMessages();
		}

		return (
			<div style={{ padding: '200px' }}>
				<Button
					primary
					onClick={() =>
						this.sendMessage('testmessage2', 'jHRSN183heYYQL2UquuIV0dS0Xg1')
					}
				>
					Send
				</Button>
			</div>
		);
	}
}

export const ChatComponentComposed = compose<any>(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(ChatComponent);
