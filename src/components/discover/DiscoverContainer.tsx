import React from 'react';
import { DiscoverComponent } from "./index";
import {universities} from './constants'

export class DiscoverContainer extends React.Component{
    render(){
        return(
            <div style={{ paddingTop: "100px" }}>
                <DiscoverComponent uniList={universities}/>
            </div>
        )
    }
}