import React from 'react';
import { APIkey, coordinates, defaultZoom } from './constants';
import { LoadingContainer, InfoWindowContent } from './index';
import {
	GoogleApiWrapper,
	IProvidedProps,
	Map,
	Marker,
	InfoWindow,
} from 'google-maps-react';
class MapComponent extends React.Component<IProvidedProps, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			isWindowOpen: false,
			activeMarker: null,
			selectedPlace: {},
		};
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
		return { lat: Xav / count, lng: Yav / count };
	};

	onMouseOver = (props: any, marker: any, e: any) => {
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
		return (
			<div>
				<Map
					style={{ maxWidth: '60vw', maxHeight: '80vh' }}
					onClick={this.windowCloseHandler}
					google={this.props.google}
					zoom={defaultZoom}
					initialCenter={this.findCenter(coordinates)}
					onReady={(mapProps, map) => {
						this.setState({ map: map as google.maps.Map });
					}}
				>
					{coordinates &&
						coordinates.map(place => {
							return (
								<Marker
									position={{ lat: place.X, lng: place.Y }}
									key={place.details.name}
									onMouseover={this.onMouseOver}
								/>
							);
						})}
					{this.state.map && (
						<InfoWindow
							google={this.props.google}
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
