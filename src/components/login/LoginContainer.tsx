import React from 'react';
import { Card } from 'semantic-ui-react';

export interface LoginContainerProps {
	stuff: string;
}

export class LoginContainer extends React.Component<LoginContainerProps> {
	render() {
		return <Card></Card>;
	}
}
