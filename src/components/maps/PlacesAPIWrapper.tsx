import React from "react";
import MapComponent from "./MapComponent";
import { LoadingContainer } from "./LoadingContainer";
import { PlacesAPIKey, PlacesSearchRadius } from './constants';

interface PlacesAPIWrapperStateTypes{
    results: Array<{lat: number, lng: number, details: {name: string}}>;
    isLoading: boolean;
    prevSearch: string
}

interface PlacesAPIWrapperPropTypes{
    searchType: string,
    center: {lat: number, lng: number, details :{ name: string}}
}


export class PlacesAPIWrapper extends React.Component<PlacesAPIWrapperPropTypes, PlacesAPIWrapperStateTypes>{
    constructor(props: PlacesAPIWrapperPropTypes ){
        super(props)
        this.state ={
            isLoading: false,
            results: [],
            prevSearch:'none'
        }

    }

    async fetchPlaces(center: {lat: number, lng: number, details: {name: string}}, searchType: string ){
        const { results } = this.state
        this.setState({isLoading: true, prevSearch: searchType})
        var searchUri= '', proxyurl = "https://cors-anywhere.herokuapp.com/"
        
        if (searchType === "accomodation"){
            searchUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${PlacesSearchRadius}&keyword=${center.details.name}+buildings&key=${PlacesAPIKey}`
        }
        else{
            searchUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${PlacesSearchRadius}&type=${searchType}&key=${PlacesAPIKey}`
        }
        fetch(proxyurl+searchUri)
        .then(response => {
            if(response.ok) return response.json()
        })
        .then(async data =>{
            let resultArray: any = []
            data.results.map( (element: {name: string ,geometry: {location:{lat:number, lng: number}}}) => {
                const { lat, lng } = element.geometry.location
                resultArray = resultArray.concat({lat: lat, lng: lng, details:{...element}})
            })
            this.setState({results: resultArray, isLoading: false})
        })
    }

    render(){
        const { searchType, center} = this.props
        const { isLoading, results, prevSearch } = this.state
        if(searchType !== prevSearch){
            this.fetchPlaces(center, searchType)
        }

        if(isLoading && searchType !== "none"){
            return <LoadingContainer/>
        } else if (!isLoading && searchType !== "none"){
            return <MapComponent places={results} zoomProp={10} styleProps={{divHeight:"300px"}}/>
        }
        else {
            return <MapComponent places={[center]} zoomProp={10} styleProps={{divHeight:"300px"}} />
        }
    }
}