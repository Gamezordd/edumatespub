import React from 'react';
import { Card, Image, Icon } from "semantic-ui-react";

export const DiscoverCard = (props:any) => {
    const {image, title, description, id} = props.content
    const { show, favourite, onFavouriteButtonClick } = props

    if (show){
        return(
            <Card>
                <Image wrapped src={image} ui={false}/>
                <Card.Content>
                    <Card.Header> {title} </Card.Header>
                    <Card.Description> {description} </Card.Description>
                    <Card.Meta>{favourite ? <Icon name="star" color="red" onClick={onFavouriteButtonClick(id, false)}/> : <Icon name="star" color="grey" onClick={onFavouriteButtonClick(id, true)}/> }</Card.Meta>
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