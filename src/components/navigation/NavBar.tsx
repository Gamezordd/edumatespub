import React, { Component } from 'react';
import { Responsive, Container, MenuProps, ItemProps } from 'semantic-ui-react';
import { NavBarDesktop } from './NavBarDesktop';
import { NavBarMobile } from './NavBarMobile';
import { Firebase } from '../../firebase';
import { logoutAction, appendChat } from '../../redux';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UserChatAction } from '../../redux/ActionCreators';
import { ChatStore } from '../../redux/reducers/chats';

//Add margin above components added after NavBar
const NavBarChildren: React.FC = ({ children }) => <div>{children}</div>;

interface NavbarProps {
	leftItems: ItemProps[] | null;
	rightItems: ItemProps[] | null;
	firebase: Firebase;
	logout: typeof logoutAction;
	isLoggedIn: boolean;
	uid: string;
	syncChat: typeof appendChat;
	chat: ChatStore;
	name: string;
}

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logoutAction),
	syncChat: (chat: UserChatAction) => dispatch(appendChat(chat)),
});

const mapStateToProps = (state: any) => ({
	isLoggedIn: state.user.isLoggedIn,
	uid: state.user.uid,
	name: state.user.details.name,
	chat: state.chat,
});

export class NavBarUncomposed extends Component<NavbarProps, any> {
	constructor(props: NavbarProps) {
		super(props);
		this.state = {
			visible: false,
			redirect: false,
			listenersMounted: false,
			imageUrl: '',
		};
	}

	componentDidMount() {
		if (this.props.isLoggedIn && this.state.listenersMounted === false) {
			this.mountListeners();
		}
		const imageUrl = this.props.firebase
			.getProfileImageUrlRtdb(this.props.uid)
			.then(imageUrl => this.setState({ imageUrl: imageUrl }));
	}

	componentDidUpdate() {
		if (this.props.isLoggedIn && this.state.listenersMounted === false) {
			this.mountListeners();
		}

		console.log(this.props.chat);
	}

	chatUpdateHandler = ({ id, val }: { id: string; val: any }) => {
		const name = val.name as string;
		const lastActive = val.lastActive as number;
		const latest = val.latest as string;
		const chat = val.latest as string;

		this.props.syncChat({ id, name, lastActive, latest, chat });
	};

	mountListeners = () => {
		const { uid, firebase } = this.props;
		const userChatRef = firebase.rtdb.ref(`userChats/${uid}`);

		userChatRef.on('child_added', snapshot => {
			if (snapshot.key === null) return;
			this.chatUpdateHandler({ id: snapshot.key, val: snapshot.val() });
		});

		userChatRef.on('child_changed', snapshot => {
			if (snapshot.key === null) return;
			console.log('Update detected');
			this.chatUpdateHandler({ id: snapshot.key, val: snapshot.val() });
		});
		this.setState({ listenersMounted: true });
	};

	handlePusher = () => {
		const { visible } = this.state;
		if (visible) this.setState({ visible: false });
	};

	handleToggle = () => this.setState({ visible: !this.state.visible });

	render() {
		const { children, leftItems, rightItems } = this.props;
		const { visible } = this.state;

		if (this.state.redirect === true) return <Redirect to='/' />;

		return (
			<div>
				<Responsive {...Responsive.onlyMobile}>
					<NavBarMobile
						leftItems={leftItems}
						onPusherClick={this.handlePusher}
						onToggle={this.handleToggle}
						rightItems={rightItems}
						visible={visible}
					>
						<NavBarChildren>{children}</NavBarChildren>
					</NavBarMobile>
				</Responsive>
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
					<NavBarDesktop
						leftItems={leftItems}
						rightItems={rightItems}
						name={this.props.name}
						imageUrl={this.state.imageUrl}
						isLoggedIn={this.props.isLoggedIn}
					/>
					<NavBarChildren>{children}</NavBarChildren>
				</Responsive>
			</div>
		);
	}
}

export const NavBar = compose<NavbarProps, any>(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(NavBarUncomposed);
