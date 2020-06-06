import React from 'react';
import { APIkey, coordinates, defaultZoom } from './constants';
import { LoadingContainer, InfoWindowContent } from "./index";
import { GoogleApiWrapper, IProvidedProps, Map, Marker, InfoWindow} from "google-maps-react";

class MapComponent extends React.Component<IProvidedProps>{
	state:any={
		isWindowOpen:false,
		activeMarker:null,
		selectedPlace:{}
	}

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
	
	onMouseOver = (props:any, marker:any, e:any) => {
		console.log("props: ", props, "\n marker: ", marker, "\n e: ", e);
		this.setState({activeMarker: marker, selectedPlace: props, isWindowOpen: true});
	}

	windowCloseHandler = () =>{
		this.setState({isWindowOpen: false})
	}

	render(){
		return (
			<div>
				<Map style={{maxWidth:"60vw", maxHeight:"80vh"}} onClick={this.windowCloseHandler} google={this.props.google} zoom={defaultZoom} initialCenter={this.findCenter(coordinates)}>
					{coordinates && coordinates.map(place => {
						return(
							<Marker position={{lat: place.X, lng: place.Y}} name={place.Name} onMouseover={this.onMouseOver} />
						)
					})}
					<InfoWindow
					google={this.props.google}
					marker={this.state.activeMarker}
					visible={this.state.isWindowOpen}>
						<InfoWindowContent content={this.state.selectedPlace}/>
					</InfoWindow>
				</Map>
			</div>
		);
	}
}


export default GoogleApiWrapper({
	apiKey: APIkey,
	LoadingContainer: LoadingContainer
})(MapComponent)