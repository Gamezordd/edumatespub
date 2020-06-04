import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { APIkey, coordinates, defaultZoom } from './constants';
import Marker from './MarkerComponent';

export default function MapComponent() {
	const findCenter = (places: any) => {
		var Xav = 0;
		var Yav = 0;
		var count = 0;
		places.map((place: any) => {
			++count;
			Xav = Xav + place.X;
			Yav = Yav + place.Y;
		});
		return { lat: Xav / count, lng: Yav / count };
	};

	return (
		<GoogleMapReact
			bootstrapURLKeys={{ key: `${APIkey}` }}
			defaultZoom={defaultZoom}
			defaultCenter={findCenter(coordinates)}
		>
			{coordinates.map(place => {
				return <Marker lat={place.X} lng={place.Y} name={place.Name} />;
			})}
		</GoogleMapReact>
	);
}
