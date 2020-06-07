import React from 'react';
import { Card, Image } from "semantic-ui-react";

export const DiscoverCard = (props:any) => {
    const {image, title, description} = props.content

    if (props.show){
        return(
            <Card>
                <Image wrapped src={image} ui={false}/>
                <Card.Content>
                    <Card.Header> {title} </Card.Header>
                    <Card.Description> {description} </Card.Description>
                </Card.Content>
            </Card>
        )
    }
    else{
        return(
            null
        )
    }
}