import React from 'react';
import { InfiniteScroll } from './InfiniteScroll';

export const HomeContainer: React.FC<{}> = ({}) => (
	<div style={{ overflow: 'hidden' }}>
		<InfiniteScroll />
	</div>
);
