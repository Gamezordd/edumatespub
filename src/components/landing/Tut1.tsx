import React, { Component } from 'react'

import './Landing.css';


import { Grid, Image, GridRow } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


import user1 from './assets/user.png';


function Tutorial1 (props:any) {
    console.log(props)
 
          return (  <div>
                   
    
                                    <Grid.Row><p className="Testimonial"> {props.review} </p></Grid.Row>
                                    <Grid.Row><img src={user1}   className="Phonescreenuserimg" width="23%" /></Grid.Row>
                                    <Grid.Row><p className="Testimonial"> {props.name}   </p></Grid.Row>
                                    <Grid.Row><p className="Testimonial">Successfully settled into {props.uniname} </p></Grid.Row>
                                    <Grid.Row className="Hidden">................</Grid.Row> 
                              
            </div>
          );
        }
    
    export default Tutorial1