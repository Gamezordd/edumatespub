import React from 'react';
import MapComponent from './MapComponent';
import {coordinates, defaultZoom} from './constants'
interface MapsProps {
	stuff: string;
}

export const MapsContainer: React.FC<MapsProps> = ({ stuff }) => (
	<div style={{ paddingTop: "20px" }}>
		<MapComponent places={coordinates} zoomProp={defaultZoom}/>
	</div>
);
