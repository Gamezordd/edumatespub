import React from 'react';
import './allstyle.css';

export const ChatMessage: React.FC<{
	content: string;
	recieved: boolean;
	id: string;
}> = ({ content, recieved, id }) => {
	return (
		<div id={id} className={recieved ? 'bubbleleft' : 'bubbleright'}>
			{content}
		</div>
	);
};
