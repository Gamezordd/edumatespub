import React from "react";
import { DiscoverContainerComposed } from "../discover";

export const favouritesComponent = () =>{
    return(
        <React.Fragment>
            <DiscoverContainerComposed onlyFavourites={true} />
        </React.Fragment>
    )
}