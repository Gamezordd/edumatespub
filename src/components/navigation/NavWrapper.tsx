import React from 'react';
import { ItemProps } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const userLeftItems: ItemProps[] = [
	{ content: 'Home', key: 'home', to: '/' },
	{ content: 'Maps', key: 'maps', to: '/maps' },
	{ content: 'Chat', key: 'chat', to: '/chat' },
	{ content: 'Discover', key: 'discover', to: '/discover' },
];

const userRightItems: ItemProps[] = [
	{ content: 'Log out', key: 'logout', to: '/logout' },
];

const rightItems: ItemProps[] = [
	{ content: 'Register', key: 'register', to: '/register' },
	{ content: 'Login', key: 'login', to: '/login' },
];

const NavBarWrapperUncomposed: React.FC<any> = ({ children, isLoggedIn }) => {
	console.log('Login status' + isLoggedIn);

	var lItems: ItemProps[] | null = [],
		rItems: ItemProps[] | null = rightItems;

	if (isLoggedIn) {
		rItems = userRightItems;
		lItems = userLeftItems;
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
