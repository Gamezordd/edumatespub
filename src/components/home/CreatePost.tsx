import React from 'react';
import { withFirebase } from '../../firebase/withFirebase';
import { compose } from 'recompose';
import {
	Card,
	Input,
	TextArea,
	Checkbox,
	Button,
	Transition,
	Progress,
	Image,
} from 'semantic-ui-react';
import { Firebase } from '../../firebase';

class CreatePostUncomposed extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			hasFile: false,
			title: '',
			conttent: '',
			file: null,
			progress: 0,
			isUploading: false,
			fileUrl: null,
		};

		this.fileInputRef = React.createRef();
	}

	private fileInputRef: React.RefObject<HTMLInputElement>;

	toggle = () => {
		this.setState({ hasFile: !this.state.hasFile });
	};

	makePost = () => {};

	fileChange = () => {
		if (!this.fileInputRef.current)
			this.setState({ ...this.state, ...{ file: null } });
		const file = this.fileInputRef.current?.files
			? this.fileInputRef.current?.files[0]
			: null;
		this.setState({ ...this.state, ...{ file: file } });
	};

	handleUpload = () => {
		if (this.state.file === null) return;
		const { file } = this.state;
		const firebase: Firebase = this.props.firebase;
		const storage = firebase.storage;

		const filename = `${file.name}-${Math.random() * 1000}`;

		const uploadAction = storage.ref(`postImages/${filename}`).put(file);

		this.setState({ ...this.state, ...{ isUploading: true } });

		uploadAction.on(
			'state_changed',
			snapshot => {
				// updates progress
				const progress = snapshot.bytesTransferred / snapshot.totalBytes;

				this.setState({ ...this.state, ...{ progress: progress } });
			},
			error => {
				//on error
				console.log(error);
			},
			() => {
				// on complete
				storage
					.ref('postImages')
					.child(filename)
					.getDownloadURL()
					.then(url => {
						this.setState({
							...this.state,
							...{ isUploading: false, fileUrl: url },
						});
					});
			}
		);
	};

	deleteFile = () => {
		this.setState({ ...this.state, ...{ file: null, fileUrl: null } });
	};

	render() {
		return (
			<div
				className='createPostComponent'
				style={{ padding: '5px', fontSize: '1em' }}
			>
				<Card
					style={{
						padding: '5px',
						maxWidth: '720px',
						marginTop: '5vh',
						justifyContent: 'space-between',
					}}
					centered
					fluid
				>
					<Card.Content>
						<Input placeholder='What is on your mind?' fluid />
					</Card.Content>
					<Card.Content>
						<TextArea placeholder='Tell us more!' style={{ width: '100%' }} />
					</Card.Content>
					<Card.Content>
						<Checkbox toggle onChange={() => this.toggle()} label='Add Image' />
					</Card.Content>
					<Transition visible={this.state.hasFile} animation='swing down'>
						<Card.Content>
							<Button
								as='label'
								content={this.state.file ? this.state.file.name : 'Choose File'}
								htmlFor='file'
								labelPosition='left'
								icon='file'
								disabled={this.state.isUploading}
							/>
							{this.state.file && (
								<Button
									content='Upload'
									disabled={this.state.isUploading}
									onClick={() => this.handleUpload()}
									icon='upload'
									labelPosition='left'
								/>
							)}
							{this.state.file && (
								<Button
									icon='trash'
									floated='right'
									color='red'
									onClick={() => this.deleteFile()}
									disabled={this.state.isUploading}
								/>
							)}
						</Card.Content>
					</Transition>
					{this.state.isUploading && (
						<Card.Content>
							<Progress
								active
								autoSuccess
								total={1}
								value={this.state.progress}
							/>
						</Card.Content>
					)}
					{this.state.fileUrl && (
						<Transition animation='fade down'>
							<Card.Content>
								<Image src={this.state.fileUrl} />
							</Card.Content>
						</Transition>
					)}
					<input
						ref={this.fileInputRef}
						type='file'
						id='file'
						hidden
						onChange={this.fileChange}
						accept='image/*'
					/>
					<Button
						content='Share'
						onClick={() => this.makePost()}
						style={{ width: '25%', marginLeft: '75%' }}
						color='orange'
						disabled={this.state.isUploading}
					/>
				</Card>
			</div>
		);
	}
}

export const CreatePost = compose(withFirebase)(CreatePostUncomposed);
