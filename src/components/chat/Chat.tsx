import React from 'react';
import { Card, Icon} from 'semantic-ui-react';
import './allstyle.css';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';

interface ChatProps {
	messages: any;
	selectedUser: firebase.firestore.DocumentData | undefined;
	sendHandler: (message: string, uid: string) => void;
	firebase : Firebase;
	selfUid: string
}

interface ChatState {
	message: string | undefined
}

class ChatComponent extends React.Component<ChatProps, ChatState> {
	// state = { :  }
	constructor(props: ChatProps){
		super(props);
		this.state = {
			message: undefined
		}
	}

	componentDidMount(){
		document.getElementById("newMessage")?.addEventListener('keypress', sendEvent =>{
			if(sendEvent.keyCode === 13 && this.state.message && this.props.selectedUser){
				this.props.firebase.sendChat(this.state.message, this.props.selfUid, this.props.selectedUser.uid)
				//this.props.sendHandler(this.state.message, this.props.selectedUser.uid)
				this.setState({message: undefined})
			}
			//document.removeEventListener('keypress', event =>{})
		})
	}

	renderMessages(uid: string){
		const messagesArr = this.props.messages[uid][0].map((message: any) => {
			if(!message.sent){
				return(
					<div className='bubbleleft'>
						{message.message}
					</div>
				)
			}
			else if(message.sent){
				return(
					<div className='bubbleright'>
						{message.message}
					</div>
				)
			}
			else{
				return <div>bad message</div>
			}
		})
		return messagesArr.reverse();
	}

	handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({message: event.target.value})
	}

	render() {
		const {selectedUser} = this.props
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
					<Card.Header style={{padding: 0}} >{selectedUser ? selectedUser.name : null} </Card.Header>
				</Card.Content>
				<Card.Content style={{ overflow: 'auto' }}>
					{this.props.selectedUser ? this.renderMessages(this.props.selectedUser.uid) : defaultView}
					{/*<div className='bubbleright'>How are you today?</div>
					<div className='bubbleleft'>
						I'm good what about you? I heard your cat was sick!"
					</div>
					<div className='bubbleright'>
						She's fine now! Are we still on for tonight?
					</div>
					<div className='bubbleleft'>
						For sure! Can't miss a Chelsea match!
					</div>
					<div className='bubbleright'>See you at 8 then!</div>
					<div className='bubbleleft'>Can't wait!</div>*/}
				</Card.Content>
				<Card.Content style={{ maxHeight: '10vh' }}>
					<Icon name='smile outline' />
					<input id="newMessage" style={{ width: '87%' }} onChange={this.handleOnChange} placeholder="Message" value={this.state.message ? this.state.message : ''}/>
					<Icon name='image' />
					<Icon name='heart' />
				</Card.Content>
			</Card>
		);
	}
}

export const Chat = withFirebase(ChatComponent);