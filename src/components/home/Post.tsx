import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import './Post.css';

export class Post extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div>
				<Card fluid centered>
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
											{this.props.post.userId}
										</Grid.Row>
										<Grid.Row className='Hidden'>....</Grid.Row>
										<Grid.Row className='Postinfo'>
											{this.props.post.createdAt.toDate().toString()}
										</Grid.Row>
										<Grid.Row className='Hidden'>....</Grid.Row>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row centered columns={1} className='Post'>
									<Grid.Column width='6' className='Postbg'>
										<Grid.Row>
											<p className='Posttext'>{this.props.post.content}</p>
											{this.props.files && (
												<img
													src={this.props.post.files[0]}
													className='Postimg'
												/>
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
				</Card>
			</div>
		);
	}
}
