import React from 'react';
import MapComponent from './MapComponent';
import { LoadingContainer } from './LoadingContainer';
import { PlacesAPIKey, PlacesSearchRadius } from './constants';

interface PlacesAPIWrapperStateTypes {
	results: Array<{ lat: number; lng: number; details: { name: string } }>;
	isLoading: boolean;
	prevSearch: string;
}

interface PlacesAPIWrapperPropTypes {
	searchType: string;
	center: { lat: number; lng: number; details: { name: string } };
}

export class PlacesAPIWrapper extends React.Component<
	PlacesAPIWrapperPropTypes,
	PlacesAPIWrapperStateTypes
> {
	constructor(props: PlacesAPIWrapperPropTypes) {
		super(props);
		this.state = {
			isLoading: false,
			results: [],
			prevSearch: 'none',
		};
	}

	async fetchPlaces(
		center: { lat: number; lng: number; details: { name: string } },
		searchType: string
	) {
		this.setState({ isLoading: true, prevSearch: searchType });
		var searchUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${PlacesSearchRadius}&`,
			proxyurl = 'https://cors-anywhere.herokuapp.com/';

		if (searchType === 'accomodation') {
			searchUri = `${searchUri}keyword=${center.details.name}+buildings&key=${PlacesAPIKey}`;
		} else {
			searchUri = `${searchUri}type=${searchType}&key=${PlacesAPIKey}`;
		}

		fetch(proxyurl + searchUri)
			.then(response => {
				if (response.ok) return response.json();
			})
			.then(async data => {
				let resultArray: any = [{ ...this.props.center }];
				data.results.map(
					(element: {
						name: string;
						geometry: { location: { lat: number; lng: number } };
					}) => {
						const { lat, lng } = element.geometry.location;
						resultArray = resultArray.concat({
							lat: lat,
							lng: lng,
							details: { ...element },
						});
						return null;
					}
				);
				this.setState({ results: resultArray, isLoading: false });
			});
	}

	render() {
		const { searchType, center } = this.props;
		const { isLoading, results, prevSearch } = this.state;

		if (searchType !== prevSearch) {
			this.fetchPlaces(center, searchType);
		}

		if (isLoading) {
			return <LoadingContainer />;
		} else {
			return (
				<MapComponent
					places={searchType === 'none' ? [center] : results}
					zoomProp={15}
					styleProps={{ divHeight: '350px' }}
				/>
			);
		}
	}
}
