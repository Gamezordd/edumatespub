import React, { useState } from 'react';
import { Card, Image, Icon, Grid } from 'semantic-ui-react';
import { ButtonProps } from './interfaces'
import { descriptionLength, uniImagePlaceholder } from "./constants";


export const DiscoverCard = (props: ButtonProps) => {
	var { image, name, description, id, location } = props.content;
	const { show, favourite, onFavouriteButtonClick, onCardClick } = props;
	const [isLoaded, setLoaded] = useState(false);
	const [isHovering, setHover] = useState(false);
	
	function handleClick() {
		onCardClick([
			{
				lat: location.latitude,
				lng: location.longitude,
				details: { name: name, description: description, image: image },
			},
		]);
	}

	function formatDescription(description: string) {
		if(description.length > descriptionLength){
			return(description.substring(0, descriptionLength) + "...")
		}
		else{
			return(description)
		}
	}

	if (show) {
		return (
			<Grid.Column>
				<Card>
					<img onClick={() => handleClick()} style={{objectFit:"cover", maxHeight:"254px", maxWidth:"254px"}} src={isLoaded && image!=='' && image !== undefined ? image : uniImagePlaceholder} onLoad={() => setLoaded(true)} alt={name}/>
					<Card.Content>
						<Card.Header onClick={() => handleClick()}> {name} </Card.Header>
						<Card.Description
							onClick={() => handleClick()}
							style={{ marginBottom: '5px' }}
						>
							<div style={{height:"200px", overflowY:"auto"}}>
								{description}
							</div>
						</Card.Description>
						<Card.Meta>
							{favourite ? (
								<Icon
									name='star'
									color='red'
									size='big'
									onClick={() => onFavouriteButtonClick([id], false)}
								/>
							) : (
								<Icon
									name='star'
									color='grey'
									size='big'
									onClick={() => onFavouriteButtonClick([id], true)}
								/>
							)}
						</Card.Meta>
					</Card.Content>
				</Card>
			</Grid.Column>
		);
	} else {
		return null;
	}
};
