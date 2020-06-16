import _ from 'lodash';
import React from 'react';
import { Menu, MenuProps, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const NavBarDesktop: React.FC<MenuProps> = ({
	leftItems,
	rightItems,
}) => (
	<Menu fixed='top'  >  
		<Menu.Item > 
			<Image size='small' src={process.env.PUBLIC_URL + '/blacklogo.png'} />
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
