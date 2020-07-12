import React from 'react';
import { APIkey, universityIconURL } from './constants';
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
		details: { name: string; description?: string };
		centerMap?: boolean;
	}>;
	zoomProp: number;
	//height?: string | number;
	//width?: string | number;

	styleProps?: {
		maxHeight?: string | number;
		maxWidth?: string | number;
		divHeight?: string;
	};
}

class MapComponent extends React.Component<MapComponentPropTypes, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			isWindowOpen: false,
			activeMarker: null,
			selectedPlace: {},
			markerRenderFinished: false,
			markers: [],
		};
	}

	findCenter = (
		places: {
			lat: number;
			lng: number;
			details: { name: string; description?: string | undefined };
			centerMap?: boolean;
		}[]
	) => {
		var LATav = 0;
		var LNGav = 0;
		var count = 0;
		var center = undefined;
		places.map((place: any) => {
			if (place.centerMap) {
				center = place;
			} else {
				LATav = LATav + place.lat;
				LNGav = LNGav + place.lng;
				return ++count;
			}
			return null;
		});
		if (center) {
			return center;
		} else {
			return { lat: LATav / count, lng: LNGav / count };
		}
	};

	handleClick = (props: any, marker: any, e: any) => {
		this.setState({
			activeMarker: marker,
			selectedPlace: props,
			isWindowOpen: true,
		});
	};

	windowCloseHandler = () => {
		if (this.state.isWidowOpen) {
			this.setState({ isWindowOpen: false });
		}
	};

	markerType(place: {
		lat: number;
		lng: number;
		centerMap?: boolean;
		details: { name: string; description?: string };
	}) {
		if (place.centerMap) {
			return (
				<Marker
					position={{ lat: place.lat, lng: place.lng }}
					key={place.details.name}
					onClick={this.handleClick}
					name={place.details}
					icon={{
						url: universityIconURL,
						anchor: new google.maps.Point(32, 32),
						scaledSize: new google.maps.Size(50, 50),
					}}
					animation={2}
				/>
			);
		} else {
			return (
				<Marker
					position={{ lat: place.lat, lng: place.lng }}
					key={place.details.name}
					onClick={this.handleClick}
					name={place.details}
					animation={2}
				/>
			);
		}
	}

	renderMarkers(places: any) {
		const { markerRenderFinished } = this.state;

		if (places && !markerRenderFinished) {
			const markers = places.map((place: any) => {
				return this.markerType(place);
			});
			return this.setState({ markers: markers, markerRenderFinished: true });
		}
	}

	render() {
		const { markerRenderFinished } = this.state;
		const { google, zoomProp, places, styleProps } = this.props;

		if (!markerRenderFinished) {
			this.renderMarkers(places);
		}

		var styleOptions: {
			maxHeight: string | number;
			maxWidth: string | number;
			divHeight: string | undefined;
		} = { maxHeight: '', maxWidth: '', divHeight: undefined };

		if (styleProps?.maxHeight && styleProps.maxWidth) {
			styleOptions.maxHeight = styleProps.maxHeight;
			styleOptions.maxWidth = styleProps.maxWidth;
		} else {
			styleOptions.maxHeight = '100%';
			styleOptions.maxWidth = '100%';
		}
		if (styleProps?.divHeight) {
			styleOptions.divHeight = styleProps.divHeight;
		}

		return (
			<div style={{ height: styleOptions.divHeight }}>
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
					{this.state.markers}
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
	apiKey: process.env.REACT_APP_MAPS_KEY
		? process.env.REACT_APP_MAPS_KEY
		: APIkey,
	LoadingContainer: LoadingContainer,
})(MapComponent);
