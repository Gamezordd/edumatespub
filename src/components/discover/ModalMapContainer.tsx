import React from 'react';
import MapComponent from '../maps/MapComponent';
import { ModalMapContainerPropTypes } from "./interfaces";

export function ModalMapContainer(props: ModalMapContainerPropTypes){
    const { places, zoomProp } = props
    return(
        <div>
            <MapComponent places={places} zoomProp={zoomProp} styleProps={{divHeight:"300px"}} />
        </div>
    )
}

