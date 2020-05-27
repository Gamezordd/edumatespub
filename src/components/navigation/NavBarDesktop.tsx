import _ from 'lodash';
import React from 'react';
import { Menu, MenuProps, Image } from 'semantic-ui-react';

export const NavBarDesktop: React.FC<MenuProps> = ({
	leftItems,
	rightItems,
}) => (
	<Menu fixed="top" color="teal" inverted>
		<Menu.Item>
			<Image size="small" src={process.env.PUBLIC_URL + '/logo.png'} />
		</Menu.Item>
		{_.map(leftItems, item => (
			<Menu.Item {...item} />
		))}
		<Menu.Menu position="right">
			{_.map(rightItems, item => (
				<Menu.Item {...item} />
			))}
		</Menu.Menu>
	</Menu>
);
