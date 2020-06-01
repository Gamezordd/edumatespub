import React from 'react';
import { NavBar, MapsContainer, LandingContainer, RenderForm} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ConfigureStore} from './redux';
import { Provider } from "react-redux";

export function App() {
	return (
			<div className='App'>
				<Router>
					<NavBar>
						<Switch>
							<Route exact path='/' component={LandingContainer} />
							<Route exact path='/maps' component={MapsContainer} />
							<Route exact path='/register' component={RenderForm} />
						</Switch>
					</NavBar>
				</Router>
			</div>
	);
}
