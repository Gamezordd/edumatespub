import React from 'react';
import { Feed, Image } from 'semantic-ui-react';
import './allstyle.css';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { LoadingContainer } from '../maps';

const user = process.env.PUBLIC_URL + '/userDefault.png';

const dateOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hour12: false,
};

interface ChatListEntryProps {
	chatDetails: any;
	firebase: Firebase;
	clickHandler: (user: any) => void;
}

interface ChatListEntryState {
	imageUrl: string;
}

class ChatListEntryUncomposed extends React.Component<
	ChatListEntryProps,
	ChatListEntryState
> {
	constructor(props: ChatListEntryProps) {
		super(props);
		this.state = {
			imageUrl: '',
		};
	}
	componentDidMount() {
		this.props.firebase
			.getProfileImageUrlRtdb(this.props.chatDetails.userId)
			.then(url => {
				this.setState({ imageUrl: url });
			});
	}

	formatDescription = (description: string) => {
		if (description.length > 100) {
			return description.substring(0, 25) + '...';
		} else {
			return description;
		}
	};
	render() {
		const { chatDetails } = this.props;
		const unformatted = new Date(chatDetails.lastActive);
		const date = new Intl.DateTimeFormat('en-us', dateOptions).format(
			unformatted
		);
		if (chatDetails) {
			return (
				<Feed.Event
					onClick={() => this.props.clickHandler(chatDetails)}
					style={{ paddingLeft: '2vw' }}
				>
					<Image
						src={this.state.imageUrl ? this.state.imageUrl : user}
						floated='left'
						style={{
							objectFit: 'cover',
							borderRadius: '50%',
							height: '8vh',
							width: '8vh',
						}}
					/>

					<Feed.Content>
						<Feed.Summary>{chatDetails.name}</Feed.Summary>
						<Feed.Date>{date}</Feed.Date>
						<Feed.Extra>
							{this.formatDescription(chatDetails.latest)}
						</Feed.Extra>
					</Feed.Content>
				</Feed.Event>
			);
		} else {
			return <LoadingContainer />;
		}
	}
}

export const ChatListEntry = withFirebase(ChatListEntryUncomposed);
