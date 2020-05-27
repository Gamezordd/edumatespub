import React from 'react';
import { NavBar, MapsContainer, LandingContainer } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export function App() {
	return (
		<div className="App">
			<NavBar />
			<Router>
				<Switch>
					<Route exact path="/" component={LandingContainer} />
					<Route exact path="/maps" component={MapsContainer} />
				</Switch>
			</Router>
		</div>
	);
}
