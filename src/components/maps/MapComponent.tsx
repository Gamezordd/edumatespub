import React from 'react';
import { APIkey } from './constants';
import { LoadingContainer, InfoWindowContent } from './index';
import {
	GoogleApiWrapper,
	Map,
	Marker,
	InfoWindow,
	GoogleAPI,
} from 'google-maps-react';

interface MapComponentPropTypes {
	google: GoogleAPI;
	places: Array<{
		lat: number;
		lng: number;
		details: { name: string; description: string };
	}>;
	zoomProp: number;
	//height?: string | number;
	//width?: string | number;

	styleProps?: {
		maxHeight?: string | number;
		maxWidth?: string | number;
		divHeight? : string;
	};
}

class MapComponent extends React.Component<MapComponentPropTypes, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			isWindowOpen: false,
			activeMarker: null,
			selectedPlace: {},
		};
	}

	findCenter = (places: any) => {
		var LATav = 0;
		var LNGav = 0;
		var count = 0;
		places.map((place: any) => {
			LATav = LATav + place.lat;
			LNGav = LNGav + place.lng;
			return ++count;
		});
		console.log("center coordinates: ", { lat: LATav / count, lng: LNGav / count });
		
		return { lat: LATav / count, lng: LNGav / count };
	};

	handleClick = (props: any, marker: any, e: any) => {
		console.log('props: ', props, '\n marker: ', marker, '\n e: ', e);
		this.setState({
			activeMarker: marker,
			selectedPlace: props,
			isWindowOpen: true,
		});
	};

	windowCloseHandler = () => {
		this.setState({ isWindowOpen: false });
	};

	render() {
		const { google, zoomProp, places, styleProps } = this.props;

		var styleOptions: {
			maxHeight: string | number;
			maxWidth: string | number;
			divHeight: string | undefined
		} = { maxHeight: '', maxWidth: '', divHeight: undefined };

		if (styleProps?.maxHeight && styleProps.maxWidth) {
			styleOptions.maxHeight = styleProps.maxHeight;
			styleOptions.maxWidth = styleProps.maxWidth;
		} else {
			styleOptions.maxHeight = '100%';
			styleOptions.maxWidth = '100%';
		}
		if(styleProps?.divHeight){
			styleOptions.divHeight = styleProps.divHeight
		}

		return (
			<div style={{height: styleOptions.divHeight}}>
				<Map
					style={{
						maxWidth: styleOptions.maxWidth,
						maxHeight: styleOptions.maxHeight,
					}}
					onClick={this.windowCloseHandler}
					google={google}
					zoom={zoomProp}
					initialCenter={this.findCenter(places)}
					onReady={(mapProps, map) => {
						this.setState({ map: map as google.maps.Map });
					}}
				>
					{places &&
						places.map(place => {
							return (
								<Marker
									position={{ lat: place.lat, lng: place.lng }}
									key={place.details.name}
									onClick={this.handleClick}
									name={place.details}
								/>
							);
						})}
					{this.state.map && (
						<InfoWindow
							google={google}
							marker={this.state.activeMarker}
							visible={this.state.isWindowOpen}
							map={this.state.map}
						>
							<InfoWindowContent content={this.state.selectedPlace} />
						</InfoWindow>
					)}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: APIkey,
	LoadingContainer: LoadingContainer,
})(MapComponent);
