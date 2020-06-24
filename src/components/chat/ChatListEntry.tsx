import React from 'react';
import { Feed } from 'semantic-ui-react';
import './allstyle.css';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { LoadingContainer } from '../maps';

interface ChatListEntryProps {
	id: string;
	firebase: Firebase;
	clickHandler: (user: any) => void;
}

interface ChatListEntryState {
	user: firebase.firestore.DocumentData | undefined;
}

class ChatListEntryUncomposed extends React.Component<
	ChatListEntryProps,
	ChatListEntryState
> {
	//state = { :  }
	constructor(props: ChatListEntryProps) {
		super(props);
		this.state = {
			user: undefined,
		};
	}
	componentDidMount() {
		this.props.firebase.fetchUser(this.props.id).then(user => {
			this.setState({ user: user });
		});
	}

	writetocon = () => {
		console.log('Chat was pressed');
	};
	formatDescription = (description: string) => {
		if (description.length > 100) {
			return description.substring(0, 25) + '...';
		} else {
			return description;
		}
	};
	render() {
		const { user } = this.state;
		if (user) {
			return (
				<Feed.Event
					onClick={() =>
						this.props.clickHandler({ ...user, uid: this.props.id })
					}
				>
					<Feed.Label
						image={user.profileImage === 'default' ? null : user.profileImage}
						style={{ paddingLeft: '5px' }}
					/>
					<Feed.Content>
						<Feed.User>{user.name}</Feed.User>
					</Feed.Content>
				</Feed.Event>
			);
		} else {
			return <LoadingContainer />;
		}
	}
}

export const ChatListEntry = withFirebase(ChatListEntryUncomposed);
