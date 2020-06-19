import React from 'react';
import { Grid } from 'semantic-ui-react';

class Post extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div>
				<Grid>
					<Grid.Row centered columns={1} className='Post'>
						<Grid.Column width={6}>
							<Grid.Row className='Hidden'>....</Grid.Row>

							<Grid.Row className='Hidden'>....</Grid.Row>

							<Grid.Row className='Hidden'>....</Grid.Row>

							<Grid.Row centered columns={2}>
								<Grid.Column width='1' className='Postbgpic'>
									<img src={''} className='Postprofilepic' />
								</Grid.Column>
								<Grid.Column width='5' className='Postbginfo'>
									<Grid.Row className='Hidden'>....</Grid.Row>
									<Grid.Row className='Postinfo'>
										Loughborough University{' '}
									</Grid.Row>
									<Grid.Row className='Hidden'>....</Grid.Row>
									<Grid.Row className='Postinfo'>Date</Grid.Row>
									<Grid.Row className='Hidden'>....</Grid.Row>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row centered columns={1} className='Post'>
								<Grid.Column width='6' className='Postbg'>
									<Grid.Row>
										<p className='Posttext'>{this.props.post.content}</p>
										{this.props.files && (
											<img src={this.props.files[0]} className='Postimg' />
										)}
									</Grid.Row>
								</Grid.Column>
							</Grid.Row>

							<Grid.Row centered columns={1}>
								<Grid.Column width='6'>
									<Grid.Row className='postbottom'>
										{this.props.post.likeCount}
									</Grid.Row>
								</Grid.Column>
							</Grid.Row>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}
