import React from 'react';
import { DiscoverCard } from './DiscoverCard';
import { cardWidths } from './constants';
import { Grid } from 'semantic-ui-react';
import { CardContainerProps } from './interfaces';

export class CardContainerComponent extends React.Component<
	CardContainerProps,
	any
> {
	constructor(props: any) {
		super(props);
		this.state = {
			currentCols: 0,
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleEnumerateColumns);
		this.handleEnumerateColumns();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleEnumerateColumns);
	}

	handleEnumerateColumns = () => {
		var diff = window.innerWidth;
		var currentCols = 0;
		cardWidths.map(data => {
			if (
				data.minWidth < window.innerWidth &&
				window.innerWidth - data.minWidth <= diff
			) {
				diff = window.innerWidth - data.minWidth;
				currentCols = data.cols;
			}
			return null;
		});
		this.setState({ currentCols: currentCols });
	};

	render() {
		const {
			data,
			onFavouriteButtonClick,
			selectedCardData,
			favouriteUnis,
			selected,
			onCardClick,
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
			<Grid
				centered
				style={{ paddingTop: '10px' }}
				columns={this.state.currentCols}
				container
			>
				{RenderCards}
			</Grid>
		);
	}
}
