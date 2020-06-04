import React from 'react';
import MapComponent from './MapComponent';
interface MapsProps {
	stuff: string;
}

export const MapsContainer: React.FC<MapsProps> = ({ stuff }) => (
	<div style={{ paddingTop: '10vh' }}>
		<MapComponent />
	</div>
);
