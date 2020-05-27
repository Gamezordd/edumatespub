import React from 'react';
import { ItemProps } from 'semantic-ui-react';
import { NavBar } from './NavBar';

const leftItems: ItemProps[] = [
	{ content: 'Home', key: 'home', href: '/' },
	{ content: 'Maps', key: 'maps', href: '/maps' },
	{ content: 'Chat', key: 'chat', href: '/chat' },
];

const rightItems: ItemProps[] = [
	{ content: 'Register', key: 'register', href: '/register' },
	{ content: 'Login', key: 'login', href: '/login' },
];

export const NavBarWrapper: React.FC = _ => (
	<NavBar leftItems={leftItems} rightItems={rightItems} />
);
