import React from 'react';
import { compose } from 'redux';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { Firebase } from '../../firebase';
import { addChatsAction } from '../../redux';
interface IState {
	newMessage: boolean;
	chats: object[];
	rawMessages: Array<{
		data: { message: string; sender: string; receiver: string };
		messageId: string;
	}>;
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

		rtdbMessageRef.on('value', (snapshot: any) => {
			this.setState({ newMessage: true });
			const data: any = snapshot.val();
			let payload: any = [];
			Object.keys(data).forEach(key => {
				if (
					data[key]['receiver'] === 'BhqKSeHJuFTJ8UJoOvJoh8EzdV52' ||
					data[key]['sender'] === 'BhqKSeHJuFTJ8UJoOvJoh8EzdV52'
				) {
					payload = payload.concat({ data: data[key], messageId: key });
				}
			});
			this.setState({ rawMessages: payload });
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
		};
	}
	updateMessages() {
		const { chats, rawMessages } = this.state;
		var newChats: any = chats;
		rawMessages.map((message, index) => {
			const receiverIndex = newChats.findIndex(
				(element: any) => element.uid === message.data.receiver
			);

			if (receiverIndex < 0) {
				if (message.data.receiver === 'BhqKSeHJuFTJ8UJoOvJoh8EzdV52') {
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
										message.data.sender === 'BhqKSeHJuFTJ8UJoOvJoh8EzdV52'
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
									message.data.sender === 'BhqKSeHJuFTJ8UJoOvJoh8EzdV52'
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
									message.data.sender === 'BhqKSeHJuFTJ8UJoOvJoh8EzdV52'
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
							message.data.sender === 'BhqKSeHJuFTJ8UJoOvJoh8EzdV52'
								? true
								: false,
						messageId: message.messageId,
					}),
				};
			}
		});
		console.log('newChats: ', newChats);
		this.props.addChats(newChats)
		this.setState({ newMessage: false, chats: newChats });
	}
	render() {
		const { newMessage, rawMessages } = this.state;
		if (newMessage && rawMessages.length !== 0) {
			this.updateMessages();
		}

		return null;
	}
}

export const ChatComponentComposed = compose<any>(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(ChatComponent);
