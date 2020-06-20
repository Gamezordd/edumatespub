import React from 'react';
import { LandingPage } from './Landing';

interface LandingProps {
	stuff: string;
}

export const LandingContainer: React.FC<LandingProps> = ({ stuff }) => (
	<div
		style={{
			backgroundColor: 'white',
			width: '100%',
			backgroundRepeat: 'cover',
		}}
	>
		<LandingPage />
	</div>
);
