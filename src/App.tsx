import React from 'react';
import {
	NavBar,
	MapsContainer,
	LandingContainer,
	Login,
	RegistrationForm,
	LogOut,
	DiscoverContainer
} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar>
					<Switch>
						<Route exact path='/' component={LandingContainer} />
						<Route exact path='/maps' component={MapsContainer} />
						<Route exact path={'/register'} component={RegistrationForm} />
						<Route exact path={'/login'} component={Login} />
						<Route exact path={'/logout'} component={LogOut} />
						<Route exact path='/discover' component={DiscoverContainer} />
					</Switch>
				</NavBar>
			</Router>
		</div>
	);
}
