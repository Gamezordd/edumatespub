import React from 'react';
import { DiscoverComponentComposed } from "./index";
//import {universities} from './constants'
import { withFirebase } from '../../firebase/withFirebase';
import { Firebase } from '../../firebase';
import { compose } from 'recompose';
import { connect } from 'react-redux';


const mapStateToProps = (state: any) => {
    return{
        universities: state.universities
    }
}

interface DiscoverContainerProps{
    firebase: Firebase,
    universities: object[];
}

class DiscoverContainer extends React.Component< DiscoverContainerProps >{
    constructor(props: any){
        super(props);
    }

    render(){
        return(
            <div style={{ paddingTop: "100px" }}>
                <DiscoverComponentComposed uniList={this.props.universities}/>
            </div>
        )
    }
}

export const DiscoverContainerComposed = compose(
    withFirebase,
    connect(mapStateToProps)
)(DiscoverContainer)