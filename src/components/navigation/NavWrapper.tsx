import React from 'react';
import { ItemProps } from 'semantic-ui-react';
import { NavBar } from './NavBar';

const leftItems: ItemProps[] = [
	{ content: 'Home', key: 'home', to: '/' },
	{ content: 'Maps', key: 'maps', to: '/maps' },
	{ content: 'Chat', key: 'chat', to: '/chat' },
];

const rightItems: ItemProps[] = [
	{ content: 'Register', key: 'register', to: '/register' },
	{ content: 'Login', key: 'login', to: '/login' },
];

export const NavBarWrapper: React.FC = ({ children }) => (
	<NavBar leftItems={leftItems} rightItems={rightItems}>
		{children}
	</NavBar>
);
