import React from 'react';
import {
	NavBar,
	MapsContainer,
	LandingContainer,
	RenderForm,
	Login,
} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginForm } from './components/forms';

export function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar>
					<Switch>
						<Route exact path='/' component={LandingContainer} />
						<Route exact path='/maps' component={MapsContainer} />
						<Route exact path={'/register'} component={RenderForm} />
						<Route exact path={'/login'} component={LoginForm} />
					</Switch>
				</NavBar>
			</Router>
		</div>
	);
}
