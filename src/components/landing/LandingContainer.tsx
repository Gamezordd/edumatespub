import React from 'react';
import { LandingPage } from './Landing';

interface LandingProps {
	stuff: string;
}

export const LandingContainer: React.FC<LandingProps> = ({ stuff }) => (
	<div>
		<LandingPage />
	</div>
);
