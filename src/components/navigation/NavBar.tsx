import React, { Component } from 'react';
import { Responsive, Container, MenuProps, ItemProps } from 'semantic-ui-react';
import { NavBarDesktop } from './NavBarDesktop';
import { NavBarMobile } from './NavBarMobile';

//Add margin above components added after NavBar
const NavBarChildren: React.FC = ({ children }) => (
	<Container style={{ marginTop: '5em' }}>{children}</Container>
);

export class NavBar extends Component<
	{ leftItems: ItemProps[] | null; rightItems: ItemProps[] | null },
	MenuProps
> {
	state = {
		visible: false,
	};

	handlePusher = () => {
		const { visible } = this.state;
		if (visible) this.setState({ visible: false });
	};

	handleToggle = () => this.setState({ visible: !this.state.visible });

	render() {
		const { children, leftItems, rightItems } = this.props;
		const { visible } = this.state;

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
					<NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
					<NavBarChildren>{children}</NavBarChildren>
				</Responsive>
			</div>
		);
	}
}
