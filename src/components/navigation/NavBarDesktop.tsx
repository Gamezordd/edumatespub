import _ from 'lodash';
import React from 'react';
import { Menu, MenuProps, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './NavBarStyle.css';
const user = process.env.PUBLIC_URL + '/userDefault.png';

export const NavBarDesktop: React.FC<MenuProps> = ({
	leftItems,
	rightItems,
	name,
	imageUrl,
	isLoggedIn,
}) => {
	const trigger = (
		<span>
			{name}
			{'    '}
			<Image avatar src={imageUrl === '' ? user : imageUrl} />
		</span>
	);
	return (
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
				{isLoggedIn ? (
					<Dropdown item trigger={trigger}>
						<Dropdown.Menu>
							<Dropdown.Header />
							{_.map(rightItems, item => (
								<Dropdown.Item as={Link} {...item} />
							))}
						</Dropdown.Menu>
					</Dropdown>
				) : (
					<Menu.Menu position='right'>
						{_.map(rightItems, item => (
							<Menu.Item as={Link} {...item} />
						))}
					</Menu.Menu>
				)}
			</Menu.Menu>
		</Menu>
	);
};
