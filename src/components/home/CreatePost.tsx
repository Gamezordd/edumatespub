import React from 'react';
import { withFirebase } from '../../firebase/withFirebase';
import { compose } from 'recompose';
import { Card } from 'semantic-ui-react';

class CreatePostUncomposed extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { hasFile: false };
	}

	render() {
		return (
			<div className='createPostComponent'>
				<Card></Card>
			</div>
		);
	}
}

export const CreatePost = compose(withFirebase)(CreatePostUncomposed);
