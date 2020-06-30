import React, { useState } from 'react';
import { Card, Icon, Grid, Button } from 'semantic-ui-react';
import { ButtonProps } from './interfaces';
import { descriptionLength, uniImagePlaceholder } from './constants';

export const DiscoverCard = (props: ButtonProps) => {
	var { image, name, description, id, location } = props.content;
	const {
		show,
		favourite,
		onFavouriteButtonClick,
		onCardClick,
		onlyFavourites,
		setChat,
	} = props;
	const [isLoaded, setLoaded] = useState(false);

	function handleClick() {
		onCardClick([
			{
				lat: location.latitude,
				lng: location.longitude,
				details: { name: name, description: description, image: image },
				centerMap: true,
			},
		]);
	}

	function formatDescription(description: string) {
		if (description.length > descriptionLength) {
			return description.substring(0, descriptionLength) + '...';
		} else {
			return description;
		}
	}
	const notFavourite = (
		<Icon
			name='star'
			color='grey'
			size='big'
			onClick={() => onFavouriteButtonClick([id], true)}
		/>
	);

	const isfavourite = (
		<Icon
			name='star'
			color='red'
			size='big'
			onClick={() => onFavouriteButtonClick([id], false)}
		/>
	);

	const card = (
		<Grid.Column>
			<Card centered style={{ maxWidth: '254px' }}>
				<div
					style={{ maxWidth: '254px', height: '254px', position: 'relative' }}
				>
					<img
						onClick={() => handleClick()}
						style={{ objectFit: 'cover', maxHeight: '254px', width: '254px' }}
						src={
							isLoaded && image !== '' && image !== undefined
								? image
								: uniImagePlaceholder
						}
						onLoad={() => setLoaded(true)}
						alt={name}
					/>
					{isLoaded ? (
						<div
							style={{
								position: 'absolute',
								bottom: '2%',
								left: '2%',
								opacity: '0.8',
							}}
						>
							{favourite ? isfavourite : notFavourite}
						</div>
					) : null}
				</div>
				<Card.Content>
					<Card.Header onClick={() => handleClick()}> {name} </Card.Header>
					<Card.Description
						onClick={() => handleClick()}
						style={{ marginBottom: '5px' }}
					>
						<div style={{ maxWidth: '254px', overflowY: 'auto' }}>
							{formatDescription(description)}
						</div>
					</Card.Description>
					<Card.Meta>
						<Button basic color='grey' size='tiny' onClick={() => setChat(id)}>
							{' '}
							Chat{' '}
						</Button>
					</Card.Meta>
				</Card.Content>
			</Card>
		</Grid.Column>
	);

	if (show) {
		if (onlyFavourites && favourite) {
			return <React.Fragment>{card}</React.Fragment>;
		} else if (!onlyFavourites || onlyFavourites === undefined) {
			return <React.Fragment>{card}</React.Fragment>;
		} else {
			//only for the compiler
			return null;
		}
	} else {
		return null;
	}
};
