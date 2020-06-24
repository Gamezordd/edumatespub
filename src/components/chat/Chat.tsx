import React from 'react';
import { Card, Input, Icon } from 'semantic-ui-react';
import './allstyle.css';

interface ChatProps {}

interface ChatState {}

export class Chat extends React.Component<ChatProps, ChatState> {
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
