import React from 'react';
import { NavBar, MapsContainer, LandingContainer } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ConfigureStore} from './redux';
import { Provider } from "react-redux";

export function App() {
	return (
		<Provider store = {ConfigureStore()}>
			<div className='App'>
				<Router>
					<NavBar>
						<Switch>
							<Route exact path='/' component={LandingContainer} />
							<Route exact path='/maps' component={MapsContainer} />
						</Switch>
					</NavBar>
				</Router>
			</div>
		</Provider>
	);
}
