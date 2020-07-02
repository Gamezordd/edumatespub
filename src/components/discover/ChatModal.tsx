import React from 'react';
import { Tab, Grid, Card, Dimmer, Loader } from 'semantic-ui-react';
import { ChatCardGroup } from './ChatCardGroup';
import { Firebase } from '../../firebase';
import { withFirebase } from '../../firebase/withFirebase';

interface ChatContainerProps {
	firebase: Firebase;
	universityId: string;
}

interface ChatContainerState {
	isLoading: boolean;
	experts: any[];
	ambassadors: any[];
}

class ChatContainerUncomposed extends React.Component<
	ChatContainerProps,
	ChatContainerState
> {
	constructor(props: any) {
		super(props);
		this.state = { isLoading: true, ambassadors: [], experts: [] };
		this.initiate();
	}

	initiate = async () => {
		const ambassadors = await this.props.firebase.getAmbassadors(
			this.props.universityId
		);
		const experts = await this.props.firebase.getExperts();
		console.log('Experts', experts);
		console.log('Ambassadors', ambassadors);
		this.setState({
			ambassadors: ambassadors,
			experts: experts,
			isLoading: false,
		});
	};

	dataFilter = (type: string) => {
		return this.state.ambassadors.filter(user => user.type == type);
	};

	panes = [
		{
			menuItem: 'Student Representative',
			render: () => (
				<Tab.Pane>
					<ChatCardGroup data={this.dataFilter('studentRepresentative')} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'EduMates Expert',
			render: () => (
				<Tab.Pane>
					<ChatCardGroup data={this.state.experts} />
				</Tab.Pane>
			),
		},
	];
	//state = { :  }
	render() {
		return (
			<div>
				<Dimmer active={this.state.isLoading}>
					<Loader content='Fetching Details...' />
				</Dimmer>
				<Tab panes={this.panes} />
			</div>
		);
	}
}

export const ChatModal = withFirebase(ChatContainerUncomposed);
