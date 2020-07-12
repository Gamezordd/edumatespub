import React from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import { compose } from 'redux';
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';

interface DeleteProps {
	postId: string;
	firebase: Firebase;
	refresh: () => void;
}

interface DeleteState {
	confirming: boolean;
}

class DeleteButtonUncomposed extends React.Component<DeleteProps, DeleteState> {
	constructor(props: DeleteProps) {
		super(props);
		this.state = { confirming: false };
	}

	confirm = () => this.setState({ confirming: true });

	closeConfirm = () => this.setState({ confirming: false });

	delete = async () => {
		await this.props.firebase.deletePost(this.props.postId);
		this.props.refresh();
		this.setState({ confirming: false });
		window.location.reload();
	};

	render() {
		return (
			<div>
				<Button
					floated='right'
					color='red'
					compact
					icon='trash'
					onClick={() => this.confirm()}
				/>
				<Confirm
					open={this.state.confirming}
					onCancel={this.closeConfirm}
					onConfirm={this.delete}
					header='Delete post?'
					content='Posts once deleted, cannot be retrieved'
					cancelButton='Oops! No thanks.'
					confirmButton='Delete Post'
				/>
			</div>
		);
	}
}

export const DeleteButton = compose<React.ComponentType<DeleteProps>>(
	withFirebase
)(DeleteButtonUncomposed);
