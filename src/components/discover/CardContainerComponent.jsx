import React from 'react';
import { DiscoverCard } from './DiscoverCard';
import { cardWidths } from './constants'
import { Grid } from 'semantic-ui-react';

export class CardContainerComponent extends React.Component{
	render() {
		const {
			data,
			onFavouriteButtonClick,
			selectedCardData,
			favouriteUnis,
			selected,
			onCardClick
		} = this.props;
		var renderData = [];
		if (!selected) {
			renderData = data;
		} else {
			if (selectedCardData) renderData = [selectedCardData];
		}

		const RenderCards = renderData.map((university) => {
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
		function columns(){
			var currentWidth = 0;
			var currentCols = 0;
			cardWidths.map(data => {
				if(data.minWidth < window.innerWidth && data.minWidth > currentWidth){
					console.log("curentWidth:", currentWidth);
					
					currentWidth = data.minWidth;
					currentCols = data.cols;
				}
				return null
			})
			console.log("currentcols: ", currentCols);
			
			return currentCols
		}

		return (
			<Grid centered style={{ paddingTop: '10px' }} columns={columns()} container>
					{RenderCards}
			</Grid>
		);
	}
}
