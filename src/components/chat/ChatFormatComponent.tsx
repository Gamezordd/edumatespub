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
		data: { message: string; sender: string; receiver: string, timestamp: number };
		messageId: string;
	}>;
	fetchMessages: boolean;
	limitCount: number
}

interface IProps {
	firebase: Firebase;
	user: any;
	addChats: typeof addChatsAction;
	chat: {
		messages: Array<{
			data: { message: string; sender: string; receiver: string, timestamp: number };
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

//this.props.user.uid
class ChatComponent extends React.Component<IProps, IState> {
	componentDidMount() {
		const {limitCount} = this.state
 		const rtdbMessageRef = this.props.firebase.rtdb.ref('Chats/');
		var payload: any = [];
		rtdbMessageRef.limitToLast(limitCount).on('child_added', snapshot => {
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
		rtdbMessageRef.limitToLast(limitCount).on('child_removed', child=>{
			console.log("removed: ", child.val());
			this.setState({rawMessages: [child.val()].concat(this.state.rawMessages)})
		})
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
			limitCount: 100
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
										message.data.sender === this.props.user.uid ? true : false,
									messageId: message.messageId,
									timestamp: message.data.timestamp
								},
							],
						});
					} else {
						newChats[senderIndex] = {
							uid: message.data.sender,
							messages: newChats[senderIndex]['messages'].concat({
								message: message.data.message,
								sent:
									message.data.sender === this.props.user.uid ? true : false,
								messageId: message.messageId,
								timestamp: message.data.timestamp
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
									message.data.sender === this.props.user.uid ? true : false,
								messageId: message.messageId,
								timestamp: message.data.timestamp
							},
						],
					});
				}
			} else {
				newChats[receiverIndex] = {
					uid: message.data.receiver,
					messages: newChats[receiverIndex]['messages'].concat({
						message: message.data.message,
						sent: message.data.sender === this.props.user.uid ? true : false,
						messageId: message.messageId,
						timestamp: message.data.timestamp
					}),
				};
			}
		});
		const chronoChats = this.orderChronologically(newChats)
		console.log('chats: ', chronoChats);
		this.props.addChats(chronoChats);
		this.setState({ newMessage: false, chats: chronoChats});
	}

	orderChronologically(chats: any) {
		var mapChats = chats
		mapChats.map(
			(chat: {
				messages: [{ message: string; timestamp: number }];
			}) => {
				for(let i = 0; i <= chat.messages.length; i++){
					for(let j = 0; j <= chat.messages.length; j++){

						if(chat.messages[j] && chat.messages[j+1] && chat.messages[j].timestamp < chat.messages[j+1].timestamp){
							const temp = chat.messages[j];
							chat.messages[j] = chat.messages[j+1];
							chat.messages[j+1] = temp;
						}
					}
				}
			}
		);

		return mapChats
	}

	sendMessage(message: string, toUid: string) {
		this.props.firebase.sendChat(message, this.props.user.uid, toUid);
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
