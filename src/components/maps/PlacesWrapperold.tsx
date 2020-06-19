import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

import { LoadingContainer } from './index';
import { PlacesAPIKey, PlacesSearchRadius } from './constants';

export function PlacesWrapper(props: any) {
    const { place, searchType } = props;
	const [isLoading, setLoading] = useState(true);
    var places: Array<{
        lat: number,
        lng: number,
        details: {name: string}
    }> = []
    
    /*useEffect(() =>{
        const script = document.createElement("script")
        script.async = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${PlacesAPIKey}&libraries=places`
        script.type="text/javascript"
        document.head.appendChild(script)
    })*/

	async function handleNearbyPlaces(place: {lat: number, lng: number, details: {name: string}}, type: string) {
        setLoading(true);
        var results: Array<{
            lat: number,
            lng: number,
            details: {name: string}
        }>= []
		if (place && type !== "none") {
            var searchUri= '', proxyurl = "https://cors-anywhere.herokuapp.com/"
            
            if (type === "accomodation"){
                searchUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${place.lat},${place.lng}&radius=${PlacesSearchRadius}&keyword=${place.details.name}+buildings&key=${PlacesAPIKey}`
            }
            else{
                searchUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${place.lat},${place.lng}&radius=${PlacesSearchRadius}&type=${type}&key=${PlacesAPIKey}`
            }
            fetch(proxyurl+searchUri)
            .then(response => {
                if(response.ok) return response.json()
            })
            .then(async data =>{
                data.results.map( (element: {name: string ,geometry: {location:{lat:number, lng: number}}}) => {
                    const { lat, lng } = element.geometry.location
                    return results = results.concat({lat: lat, lng: lng, details: {...element}})
                })
                setLoading(false);
                return results
            })
            return results
        }
    }

    if(searchType === "none"){
        return <MapComponent places={[place]} zoomProp={8}/>
    }
    else{
        if(isLoading){
            return <LoadingContainer/>
        }
        else{
            //return <MapComponent places={handleNearbyPlaces(place, searchType)} zoomProp={8}/>
        }
    }
}
