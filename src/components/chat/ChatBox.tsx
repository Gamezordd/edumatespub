import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import {
	Container,
	Grid,
	Segment,
	List,
	Divider,
	Button,
	Icon,
	Input,
	Header,
} from 'semantic-ui-react';

export interface ChatBoxProps {
	firebase: Firebase;
}

export interface ChatBoxState {}

export class ChatBoxUncomposed extends React.Component<
	ChatBoxProps,
	ChatBoxState
> {
	constructor(props: any) {
		super(props);
	}
	//state = { :  }
	render() {
		return (
			<div>
				<Segment vertical>
					<Grid celled>
						<Grid.Row>
							<Grid.Column width={5}></Grid.Column>
							<Grid.Column width={11}></Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</div>
		);
	}
}

export const ChatBox = compose(withFirebase)(ChatBoxUncomposed);
