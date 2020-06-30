import React from 'react';
import { Grid, Form, Image, Input } from 'semantic-ui-react';
import logo from '../landing/assets/logo2.png';
import user from '../landing/assets/user.png';
interface SettingProps {}

interface SettingState {}

export class Setting extends React.Component<SettingProps, SettingState> {
	// state = { :  }
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<Grid
				textAlign='center'
				style={{ height: '100vh' }}
				verticalAlign='middle'
			>
				<Grid.Column style={{ maxWidth: 600 }}>
					{' '}
					<Form
						style={{
							backgroundColor: 'white',
							border: '3px solid #f3f3f3',
							borderRadius: '25px',
							textAlign: 'left',
							padding: '5%',
						}}
					>
						<Image size='medium' src={logo} centered />
						<Image size='medium' src={user} centered />
						<Input></Input>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}
