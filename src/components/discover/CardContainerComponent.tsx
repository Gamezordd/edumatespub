import React from 'react';
import { DiscoverCard } from './DiscoverCard';
import { CardContainerProps } from './interfaces';

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
				/>
			);
		});

		return <div>{RenderCards}</div>;
	}
}
