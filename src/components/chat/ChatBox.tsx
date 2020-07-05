import React from 'react';
import { Responsive } from 'semantic-ui-react';
import { MobileChatBox } from './MobileChatBox';
import { DesktopChatBox } from './DesktopChatBox';

export const ChatBox: React.FC = () => (
	<div id='ChatBox'>
		<Responsive {...Responsive.onlyMobile}>
			<MobileChatBox />
		</Responsive>
		<Responsive minWidth={Responsive.onlyTablet.minWidth}>
			<DesktopChatBox />
		</Responsive>
	</div>
);
