import React, { Component } from 'react';
import { Responsive, Container, MenuProps, ItemProps } from 'semantic-ui-react';
import { NavBarDesktop } from './NavBarDesktop';
import { NavBarMobile } from './NavBarMobile';
import { Firebase } from '../../firebase';
import { logoutAction } from '../../redux';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//Add margin above components added after NavBar
const NavBarChildren: React.FC = ({ children }) => <div>{children}</div>;

interface NavbarProps {
	leftItems: ItemProps[] | null;
	rightItems: ItemProps[] | null;
	firebase: Firebase;
	logout: typeof logoutAction;
	isLoggedIn: boolean;
}

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logoutAction),
});

const mapStateToProps = (state: any) => ({
	isLoggedIn: state.user.isLoggedIn,
});

export class NavBarUncomposed extends Component<NavbarProps, any> {
	constructor(props: NavbarProps) {
		super(props);
		this.state = {
			visible: false,
			redirect: false,
		};
	}

	handlePusher = () => {
		const { visible } = this.state;
		if (visible) this.setState({ visible: false });
	};

	handleToggle = () => this.setState({ visible: !this.state.visible });

	render() {
		const { children, leftItems, rightItems } = this.props;
		const { visible } = this.state;

		if (this.state.redirect === true) return <Redirect to='/' />;

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

export const NavBar = compose<NavbarProps, any>(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(NavBarUncomposed);
