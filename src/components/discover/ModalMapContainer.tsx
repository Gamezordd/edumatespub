import React from 'react';
import { ModalMapContainerPropTypes } from "./interfaces";
import { PlacesAPIWrapper } from '../maps';

export function ModalMapContainer(props: ModalMapContainerPropTypes){
    const { places, zoomProp, searchType } = props
    return(
        <div>
            <PlacesAPIWrapper center={places[0]} searchType={searchType}/>
        </div>
    )
}

