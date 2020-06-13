import React from 'react';
import { Card, Image, Icon, Grid } from 'semantic-ui-react';
import { ButtonProps } from './interfaces'


export const DiscoverCard = (props: ButtonProps) => {
	const { image, name, description, id, location } = props.content;
	const { show, favourite, onFavouriteButtonClick, onCardClick } = props;
	function handleClick() {
		onCardClick([
			{
				lat: location.latitude,
				lng: location.longitude,
				details: { name: name, description: description, image: image },
			},
		]);
	}
	if (show) {
		return (
			<Grid.Column>
				<Card>
					<Image onClick={() => handleClick()} wrapped src={image} ui={false} />
					<Card.Content>
						<Card.Header onClick={() => handleClick()}> {name} </Card.Header>
						<Card.Description
							onClick={() => handleClick()}
							style={{ marginBottom: '5px' }}
						>
							{' '}
							{description}{' '}
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
