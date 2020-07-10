import React from "react";
import { Loader } from "semantic-ui-react";

export const LoadingContainer = (props : any) => {
    return(
        <div style={{height:"200px"}}>
            <Loader active/>
        </div>
    )
}