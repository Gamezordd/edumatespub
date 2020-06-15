import React from 'react';
import { Modal, Image, Icon, Grid } from 'semantic-ui-react';
import { ModalMapContainer } from './ModalMapContainer';

export const DiscoverModal = (props: any) => {
	
	const { open, content } = props
	const { innerWidth } = window

	const desktopRow = (
		<Grid.Row>
			<Grid.Column width="5" verticalAlign="middle">
				<Image wrapped size='medium' src={content[0] ? content[0].details.image: ""} />
			</Grid.Column>
			<Grid.Column width="10" verticalAlign="middle">
			<div style={{marginBottom:"5%"}}>
					{content[0] ? content[0].details.description : "Description Not found"}
				</div>
			</Grid.Column>
		</Grid.Row>
	)

	const mobileRow = (
		<Grid.Row>
			<Grid.Column width="16" verticalAlign="middle">
			<div style={{marginBottom:"5%"}}>
					{content[0] ? content[0].details.description : "Description Not found"}
				</div>
			</Grid.Column>
		</Grid.Row>
	)

	return (
		<Modal open={open} onClose={props.onClose} style={{height:"80%"}}>
			<Modal.Header onClick={props.onClose}><Icon name="chevron circle left"/>{content[0] ? content[0].details.name : "Name not found"}</Modal.Header>
			<Modal.Content scrolling>
				<Grid columns="16">
					{innerWidth > 600 ? desktopRow : mobileRow}
					<Grid.Row verticalAlign="middle" columns="16" centered>
						<Grid.Column width="15">
						<ModalMapContainer places={props.content} zoomProp={8}/>
						</Grid.Column>
						<Grid.Column/>
					</Grid.Row>
				</Grid>
			</Modal.Content>
			
		</Modal>
	);
};
