import _ from 'lodash';
import React from 'react';
import { Menu, MenuProps, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './NavBarStyle.css';

export const NavBarDesktop: React.FC<MenuProps> = ({
	leftItems,
	rightItems,
}) => (
	<Menu fixed='top' pointing>
		<Menu.Item>
			<Link to='/'>
				<Image size='small' src={process.env.PUBLIC_URL + '/blacklogo.png'} />
			</Link>
		</Menu.Item>
		{_.map(leftItems, item => (
			<Menu.Item as={Link} {...item} />
		))}
		<Menu.Menu position='right'>
			{_.map(rightItems, item => (
				<Menu.Item as={Link} {...item} />
			))}
		</Menu.Menu>
	</Menu>
);
