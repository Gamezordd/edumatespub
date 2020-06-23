import React from 'react';
import {
	Grid,
	Segment,
	Card,
	Header,
	Feed,
	Input,
	Divider,
	Image,
	Icon,
	Button,
} from 'semantic-ui-react';
import user from '../landing/assets/user.png';
import './allstyle.css';

export interface ActualChatProps {}

export interface ActualChatState {}

export class ActualChat extends React.Component<
	ActualChatProps,
	ActualChatState
> {
	// state = { :  }
	render() {
		return (
			<Card
				style={{
					marginTop: '20vh',
					maxHeight: '70vh',
					width: '50vw',
					overflow: 'auto',
				}}
				centered
			>
				<Card.Content style={{ maxHeight: '10vh' }}>
					<Card.Header>Tanya</Card.Header>
				</Card.Content>
				<Card.Content style={{ overflow: 'auto' }}>
					<div className='bubbleright'>How are you today?</div>
					<div className='bubbleleft'>
						I'm good what about you? I heard your cat was sick!"
					</div>
					<div className='bubbleright'>
						She's fine now! Are we still on for tonight?
					</div>
					<div className='bubbleleft'>
						For sure! Can't miss a Chelsea match!
					</div>
					<div className='bubbleright'>See you at 8 then!</div>
					<div className='bubbleleft'>Can't wait!</div>
				</Card.Content>
				<Card.Content style={{ maxHeight: '10vh' }}>
					<Icon name='smile outline' />
					<Input style={{ width: '87%' }} />
					<Icon name='image' />
					<Icon name='heart' />
				</Card.Content>
			</Card>
		);
	}
}
