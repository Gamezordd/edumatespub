import React from 'react';
import { DiscoverCard } from './DiscoverCard';
import { CardContainerProps } from './interfaces';
import { Grid } from 'semantic-ui-react';

export class CardContainerComponent extends React.Component<
	CardContainerProps
> {
	render() {
		const {
			data,
			onFavouriteButtonClick,
			selectedCardData,
			favouriteUnis,
			selected,
			onCardClick
		} = this.props;
		var renderData: object[] = [];
		if (!selected) {
			renderData = data;
		} else {
			if (selectedCardData) renderData = [selectedCardData];
		}

		const RenderCards = renderData.map((university: any) => {
			var isFavourite = false;
			if (favouriteUnis === []) {
				isFavourite = false;
			} else {
				if (favouriteUnis.indexOf(university.id) > -1) {
					isFavourite = true;
				}
			}
			return (
				<DiscoverCard
					show={true}
					content={university}
					favourite={isFavourite}
					onFavouriteButtonClick={onFavouriteButtonClick}
					onCardClick={onCardClick}
				/>
			);
		});

		return (
			<Grid style={{ paddingTop: '10px' }} columns={4} container>
				{RenderCards}
			</Grid>
		);
	}
}
