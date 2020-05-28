import _ from 'lodash';
import React from 'react';
import { Sidebar, Menu, Image, Icon, SidebarProps } from 'semantic-ui-react';
import './NavBarStyle.css';
import { Link } from 'react-router-dom';

export const NavBarMobile: React.FC<SidebarProps> = ({
	children,
	leftItems,
	onPusherClick,
	onToggle,
	rightItems,
	visible,
}) => (
	<Sidebar.Pushable>
		<Sidebar
			as={Menu}
			animation="push"
			icon="labeled"
			inverted
			vertical
			visible={visible}
			width="thin"
		>
			{_.map(leftItems, item => (
				<Menu.Item as={Link} onClick={onPusherClick} {...item} />
			))}
			{_.map(rightItems, item => (
				<Menu.Item {...item} />
			))}
		</Sidebar>
		<Sidebar.Pusher
			dimmed={visible}
			onClick={onPusherClick}
			style={{ minHeight: '100vh' }}
		>
			<Menu fixed="top" inverted color="teal">
				<Menu.Item>
					<Image size="tiny" src={process.env.PUBLIC_URL + '/logo.png'} />
				</Menu.Item>
				<Menu.Menu position="right">
					<Menu.Item onClick={onToggle}>
						<Icon name="sidebar" />
					</Menu.Item>
					{_.map(rightItems, item => (
						<Menu.Item as={Link} {...item} />
					))}
				</Menu.Menu>
			</Menu>
			{children}
		</Sidebar.Pusher>
	</Sidebar.Pushable>
);
