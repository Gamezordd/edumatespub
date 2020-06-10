import React from 'react';
import { Card, Image, Icon } from "semantic-ui-react";

interface ButtonProps{
    content: any;
    show?: boolean;
    favourite: boolean;
    onFavouriteButtonClick: (universityId: string[], add?: boolean) => void;
}

export const DiscoverCard = (props: ButtonProps) => {
    const {image, name, description, id} = props.content
    const { show, favourite, onFavouriteButtonClick } = props
    if (show){
        return(
            <Card>
                <Image wrapped src={image} ui={false}/>
                <Card.Content>
                    <Card.Header> {name} </Card.Header>
                    <Card.Description style={{marginBottom:"5px"}}> {description} </Card.Description>
                    <Card.Meta>{favourite ? <Icon name="star" color="red" size="big" onClick={() => onFavouriteButtonClick([id], false)}/> : <Icon name="star" color="grey" size="big" onClick={() => onFavouriteButtonClick([id], true)}/> }</Card.Meta>
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