import React from 'react';
import { Tab, Grid, Card } from 'semantic-ui-react';
import { AChatCardGroup } from './AChatCardGroup';

interface AChatContainerProps {}

interface AChatContainerState {}

export class AChatContainer extends React.Component<
	AChatContainerProps,
	AChatContainerState
> {
	constructor(props: any) {
		super(props);
	}
	panes = [
		{
			menuItem: 'Ambassador',
			render: () => (
				<Tab.Pane>
					<AChatCardGroup />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Course Rep',
			render: () => (
				<Tab.Pane>
					<AChatCardGroup />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Edumates Expert',
			render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
		},
	];
	//state = { :  }
	render() {
		return (
			<Grid
				textAlign='center'
				verticalAlign='middle'
				style={{ marginTop: '20vh' }}
				stackable
			>
				<Card
					style={{
						height: '70vh',
						width: '60vw',
						overflow: 'auto',
						textAlign: 'center',
					}}
					centered
				>
					<Tab panes={this.panes} />
				</Card>
			</Grid>
		);
	}
}
