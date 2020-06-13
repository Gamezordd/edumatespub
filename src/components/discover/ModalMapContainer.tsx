import React from 'react';
import MapComponent from '../maps/MapComponent';
import { ModalMapContainerPropTypes } from "./interfaces";

export function ModalMapContainer(props: ModalMapContainerPropTypes){
    const { places, zoomProp } = props
    return(
        <div>
            <MapComponent places={places} zoomProp={zoomProp} styleProps={{maxHeight:"80%", maxWidth:"60%"}} />
        </div>
    )
}

