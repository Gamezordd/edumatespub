import React, { Component } from 'react'

import './Landing.css';


import { Grid, Image, GridRow } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import user1 from './assets/user.png';



function Tutorial2 (props:any) {
  console.log(props)
   
 
          return (  <div >
            <Grid>
                   
                   <Grid.Row className="Hidden" only="computer">....</Grid.Row>
              
             
              
          
              <Grid.Row only="computer" >
                 <Grid.Column width={2}></Grid.Column>
                 <Grid.Column width={5} >  <Grid.Row>    <p className="Testimonial"> {props.review1} </p> </Grid.Row>
                  <Grid.Row columns="2">
                    <Grid.Column>  <img src={user1} width="30%"/>  </Grid.Column>
                    <Grid.Column> <p className="Testimonial">{props.name1}</p>  </Grid.Column>
                    </Grid.Row>
                    <Grid.Row> <p className="Testimonial">Successfully settled into{props.uniname1} </p> </Grid.Row> </Grid.Column>
                    
                 <Grid.Column width={2}></Grid.Column>
                 
                 <Grid.Column width={5} >  <Grid.Row>    <p className="Testimonial">  {props.review2} </p> </Grid.Row>
                  <Grid.Row columns="2">
                    <Grid.Column>  <img src={user1} width="35%"/>  </Grid.Column>
                    <Grid.Column> <p className="Testimonial">{props.name2}</p>  </Grid.Column>
                    </Grid.Row>
                    <Grid.Row> <p className="Testimonial">Successfully settled into {props.uniname2} </p> </Grid.Row> </Grid.Column>
                 
                 
                 <Grid.Column width={2}></Grid.Column>
              </Grid.Row>
            
                 </Grid>
                              
            </div>
          );
        }
    
    export default Tutorial2