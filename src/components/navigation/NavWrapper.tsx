import React from 'react';
import { ItemProps } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import './NavBarStyle.css';

const mapStateToProps = (state: any) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		user: state.user,
	};
};

const userLeftItems: ItemProps[] = [
	{ content: 'Home', key: 'home', to: '/home', icon: 'home' },
	{ content: 'Chat', key: 'chat', to: '/chat', icon: 'chat' },
	{ content: 'Discover', key: 'discover', to: '/discover', icon: 'find' },
	{ content: 'Favourites', key: 'favourites', to: '/favourites', icon: 'star' },
];

const ambassadorLeftItems: ItemProps[] = [
	{ content: 'Home', key: 'home', to: '/home', icon: 'home' },
	{ content: 'Chat', key: 'chat', to: '/chat', icon: 'chat' },
	{ content: 'Discover', key: 'discover', to: '/discover', icon: 'find' },
];

const userRightItems: ItemProps[] = [
	{ content: 'Settings', key: 'settings', to: '/settings', icon: 'setting' },
	{
		content: 'Subscription',
		key: 'payments',
		to: '/payments',
		icon: 'payment',
	},
	{ content: 'Log out', key: 'logout', to: '/logout', icon: 'log out' },
];

const ambassadorRightItems: ItemProps[] = [
	{ content: 'Settings', key: 'settings', to: '/settings', icon: 'setting' },
	{ content: 'Log out', key: 'logout', to: '/logout', icon: 'log out' },
];

const rightItems: ItemProps[] = [
	{ content: 'Register', key: 'register', to: '/register' },
	{ content: 'Login', key: 'login', to: '/login' },
];

const NavBarWrapperUncomposed: React.FC<any> = ({
	children,
	isLoggedIn,
	user,
}) => {
	console.log(user);

	var lItems: ItemProps[] | null = [],
		rItems: ItemProps[] | null = rightItems;

	if (isLoggedIn) {
		rItems = user.isAmbassador ? ambassadorRightItems : userRightItems;
		lItems = user.isAmbassador ? ambassadorLeftItems : userLeftItems;
	}

	return (
		<NavBar leftItems={lItems} rightItems={rItems}>
			<div className='navChild'>{children}</div>
		</NavBar>
	);
};

export const NavBarWrapper = compose(connect(mapStateToProps))(
	NavBarWrapperUncomposed
);
