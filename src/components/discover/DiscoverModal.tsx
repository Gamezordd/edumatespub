import React from 'react';
import { Modal, Image, Icon } from 'semantic-ui-react';
import { ModalMapContainer } from './ModalMapContainer';

export const DiscoverModal = (props: any) => {
	console.log(props);
	
	const { open, content } = props
	return (
		<Modal open={open} onClose={props.onClose} style={{height:"80%"}}>
			<Modal.Header onClick={props.onClose}><Icon name="chevron circle left"/>{content[0] ? content[0].details.name : "Name not found"}</Modal.Header>
			<Modal.Content image>
				<Image wrapped size='medium' src={content[0] ? content[0].details.image: ""} />
				<Modal.Description>
					<div>
						<ModalMapContainer places={props.content} zoomProp={8}/>
					</div>
				</Modal.Description>
			</Modal.Content>
		</Modal>
	);
};
