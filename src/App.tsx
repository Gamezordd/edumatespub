import React from 'react';
import {
	NavBar,
	MapsContainer,
	LandingContainer,
	Login,
	RegistrationForm,
	LogOut,
	DiscoverContainerComposed,
	HomeContainer,
	PasswordForgot,
	ChatBox,
	FavouritesComponent,
	SettingsFormComposed,
	Payments,
} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export function App() {
	return (
		<div
			className='App'
			/* style={{
				backgroundImage: 'linear-gradient(to bottom, #ff8c00, #fffaf0)',
				backgroundAttachment: 'fixed',
			}} */
		>
			<Router>
				<NavBar>
					<Switch>
						<Route exact path={'/'} component={LandingContainer} />
						<Route exact path={'/home'} component={HomeContainer} />
						<Route exact path={'/maps'} component={MapsContainer} />
						<Route exact path={'/register'} component={RegistrationForm} />
						<Route exact path={'/login'} component={Login} />
						<Route exact path={'/logout'} component={LogOut} />
						<Route exact path={'/forgotPassword'} component={PasswordForgot} />
						<Route
							exact
							path={'/discover'}
							component={DiscoverContainerComposed}
						/>
						<Route exact path={'/chat'} component={ChatBox} />
						<Route exact path={'/favourites'} component={FavouritesComponent} />
						<Route exact path={'/settings'} component={SettingsFormComposed} />
						<Route exact path={'/payments'} component={Payments} />
					</Switch>
				</NavBar>
			</Router>
		</div>
	);
}
