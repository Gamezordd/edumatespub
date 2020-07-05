import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import './allstyle.css';
import { ChatList } from './ChatList';
import { Chat } from './Chat';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({
	currentChat: state.chat.current,
});

export interface ChatBoxProps {
	currentChat: any;
}

export interface ChatBoxState {
	selectedChat: any | undefined;
}

export class MobileChatBoxUncomposed extends React.Component<
	ChatBoxProps,
	ChatBoxState
> {
	constructor(props: ChatBoxProps) {
		super(props);
		this.state = {
			selectedChat: this.props.currentChat,
		};
	}

	formatMessage = (message: string) => {
		if (message.length > 100) {
			return message.substring(0, 25) + '...';
		} else {
			return message;
		}
	};

	handleChatSelect = (chat: any) => {
		this.setState({ selectedChat: chat });
	};

	clearChatSelect = () => {
		this.setState({ selectedChat: undefined });
	};

	render() {
		return (
			<div>
				{this.state.selectedChat ? (
					<Chat
						selectedChat={this.state.selectedChat}
						isMobile={true}
						clearChat={this.clearChatSelect}
					/>
				) : (
					<ChatList selectChat={this.handleChatSelect} isMobile={true} />
				)}
			</div>
		);
	}
}

export const MobileChatBox = compose<ChatBoxProps, any>(
	connect(mapStateToProps)
)(MobileChatBoxUncomposed);
