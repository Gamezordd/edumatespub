import React,{ReactDOM} from 'react';
import GoogleMapReact from 'google-map-react';
import { APIkey, coordinates, defaultZoom } from './constants';
import Marker from './MarkerComponent';

export default class MapComponent extends React.Component {
	findCenter = (places: any) => {
		var Xav = 0;
		var Yav = 0;
		var count = 0;
		places.map((place: any) => {
			++count;
			Xav = Xav + place.X;
			Yav = Yav + place.Y;
		});
		return ({ lat: Xav / count, lng: Yav / count });
	};
	render(){
		return (
			<div style={{position:"relative"}}>
			<GoogleMapReact
				style={{height:"40vh", width:"150px"}}
				bootstrapURLKeys={{ key: `${APIkey}` }}
				defaultZoom={defaultZoom}
				defaultCenter={this.findCenter(coordinates)}
			>
				{coordinates.map(place => {
					return <Marker lat={place.X} lng={place.Y} name={place.Name} />;
				})}
			</GoogleMapReact>
			</div>
		);
	}
}

