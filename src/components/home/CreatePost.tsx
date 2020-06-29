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
	Icon,
	TextAreaProps,
} from 'semantic-ui-react';
import { Firebase } from '../../firebase';
import { connect } from 'react-redux';
import { CreatePostState } from './types';

const mapStateToProps = (state: any) => ({
	user: state.user,
});

const initialState = {
	hasFile: false,
	title: '',
	content: '',
	file: null,
	progress: 0,
	isUploading: false,
	fileUrl: null,
	success: false,
	error: false,
	filename: '',
	animationDone: false,
};

const successStyle = { color: 'green' };
const errorStyle = { color: 'red' };

interface CreatePostProps {
	firebase: Firebase;
	user: any;
}

class CreatePostUncomposed extends React.Component<
	CreatePostProps,
	CreatePostState
> {
	constructor(props: any) {
		super(props);
		this.state = initialState;

		this.fileInputRef = React.createRef();

		this.makeVisible();
	}

	private fileInputRef: React.RefObject<HTMLInputElement>;

	toggle = () => {
		this.setState({ hasFile: !this.state.hasFile });
	};

	makePost = async () => {
		const { content, title, fileUrl, hasFile } = this.state;
		const { user, firebase } = this.props;
		try {
			await firebase.createPost({
				content: content,
				title: title,
				files: hasFile ? [fileUrl] : [],
				userId: user.uid,
				userName: user.details.name,
				likeCount: 0,
				universityId: user.details.universityId,
			});
			this.setState({
				...initialState,
				...{ success: true, animationDone: true },
			});
		} catch (err) {
			console.log(`Error whil create post:${err}`);
			this.setState({ ...this.state, ...{ error: true } });
		}
	};

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
		const storage = this.props.firebase.storage;

		const filename = `${file.name}-${Math.random() * 1000}`;

		const uploadAction = storage.ref(`postImages/${filename}`).put(file);

		this.setState({
			...this.state,
			...{ isUploading: true, filename: filename },
		});

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

	isInvalidPost = (): boolean =>
		this.state.content === '' || this.state.title === '';

	handleContent = (data: TextAreaProps) => {
		if (!data.value) return;
		this.setState({ ...this.state, ...{ content: data.value?.toString() } });
	};

	handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ ...this.state, ...{ title: e.target.value } });
		console.log(this.state);
	};

	deleteFile = () => {
		this.props.firebase.deletePostImage(this.state.filename);
		this.setState({
			...this.state,
			...{ file: null, fileUrl: null, filename: '' },
		});
	};

	makeVisible = () => {
		setTimeout(() => this.setState({ ...this.state, animationDone: true }), 10);
	};

	render() {
		return (
			<div
				className='createPostComponent'
				style={{ padding: '5px', fontSize: '1em' }}
			>
				<Transition animation='slide up' visible={this.state.animationDone}>
					<Card
						style={{
							padding: '5px',
							maxWidth: '720px',
							marginTop: '5vh',
						}}
						centered
						fluid
						raised
					>
						{(this.state.success || this.state.error) && (
							<Card.Content
								extra
								style={this.state.error ? errorStyle : successStyle}
							>
								<Icon name={this.state.error ? 'ban' : 'thumbs up outline'} />
								{this.state.error
									? 'Something went wrong. Please try again.'
									: 'Successfully posted!'}
							</Card.Content>
						)}
						<Card.Content>
							<Card.Header>Share with us!</Card.Header>
							<Input
								placeholder='What is on your mind?'
								fluid
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									this.handleTitle(e);
								}}
							/>
						</Card.Content>
						<Card.Content>
							<TextArea
								placeholder='Tell us more!'
								style={{ width: '100%' }}
								onChange={(
									e: React.SyntheticEvent<HTMLTextAreaElement>,
									data: TextAreaProps
								) => {
									this.handleContent(data);
								}}
							/>
						</Card.Content>
						<Card.Content>
							<Checkbox
								toggle
								onChange={() => this.toggle()}
								label='Add Image'
							/>
						</Card.Content>
						<Transition visible={this.state.hasFile} animation='swing down'>
							<Card.Content>
								<Button
									as='label'
									content={
										this.state.file ? this.state.file.name : 'Choose File'
									}
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
							<Card.Content>
								<Image src={this.state.fileUrl} />
							</Card.Content>
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
							disabled={this.state.isUploading || this.isInvalidPost()}
						/>
					</Card>
				</Transition>
			</div>
		);
	}
}

export const CreatePost = compose(
	withFirebase,
	connect(mapStateToProps)
)(CreatePostUncomposed);
