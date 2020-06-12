import React from 'react';
import { Modal, Image } from 'semantic-ui-react';

export const DiscoverModal = (props: any) => {
	console.log(props);

	return (
		<Modal open={false} onClose={props.onClose}>
			<Modal.Header>{}</Modal.Header>
			<Modal.Content image>
				<Image wrapped size='medium' />
				<Modal.Description>
					<p> {} </p>
				</Modal.Description>
			</Modal.Content>
		</Modal>
	);
};
