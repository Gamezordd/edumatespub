import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import user from '../landing/assets/user.png';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { AnyAction, Dispatch } from 'redux';
import { setChat } from '../../redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface ChatCardProps {
	details: {
		name: string;
		course: string;
		university: string;
		image: string;
		id: string;
	};
	firebase: Firebase;
	setChat: typeof setChat;
}

interface ChatCardState {
	chatSelect: boolean;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	setChat: (slectedChat: any) => dispatch(setChat(slectedChat)),
});

class ChatCardUncomposed extends React.Component<ChatCardProps, ChatCardState> {
	constructor(props: ChatCardProps) {
		super(props);
		this.state = { chatSelect: false };
	}

	chatClick = async (target: { name: string; id: string }) => {
		this.props.firebase.getChatRoom(target).then(selected => {
			console.log('To set', selected);
			this.props.setChat(selected);
			this.setState({ chatSelect: true });
		});
	};

	render() {
		if (this.state.chatSelect) return <Redirect to='/chat' />;
		const { name, course, image, id } = this.props.details;
		return (
			<Card style={{ width: '10vw', textAlign: 'center' }}>
				<Card.Content>
					<Image
						src={image ? image : user}
						style={{
							objectFit: 'cover',
							borderRadius: '50%',
							height: '14vh',
							width: '14vh',
						}}
					/>
					<Card.Header>{name}</Card.Header>
					<Card.Meta>{course}</Card.Meta>
				</Card.Content>
				<Card.Content extra>
					<Button
						content='Chat now!'
						basic
						color='grey'
						size='tiny'
						onClick={() => this.chatClick({ id, name })}
					/>
				</Card.Content>
			</Card>
		);
	}
}

export const ChatCard = compose<ChatCardProps, any>(
	withFirebase,
	connect(null, mapDispatchToProps)
)(ChatCardUncomposed);
