import React from 'react';
import { Search, SearchProps } from 'semantic-ui-react';
import _ from 'lodash';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { fetchUniversitiesAction } from '../../redux';

import { DiscoverCard /*DiscoverModal*/ } from './index';
import { DiscoverProps, initialStateProps } from './interfaces';
import { initialState } from './constants';

const mapStateToProps = (state: any) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: any) => ({
	editFavourites: (universityIds: string[], add?: boolean) => dispatch(),
});

class DiscoverComponent extends React.Component<
	DiscoverProps,
	initialStateProps
> {
	constructor(props: any) {
		super(props);
		this.state = initialState;
	}

	handleResultSelect = (
		e: React.MouseEvent<HTMLElement, MouseEvent>,
		{ result }: SearchProps
	) => {
		this.setState({ showCard: true, selection: result });
	};

	handleModalClose = () => {
		//Seperate function because modal may not always need closing
		this.setState({ isModalOpen: false });
	};

	handlesearchChange = (
		e: React.MouseEvent<HTMLElement, MouseEvent>,
		{ value }: SearchProps
	) => {
		const { uniList } = this.props;
		this.setState({ isLoading: true, value });
		setTimeout(() => {
			if (this.state.value) {
				if (this.state.value.length < 1) {
					return this.setState(initialState);
				}
			}
			const re = new RegExp(_.escapeRegExp(this.state.value), 'i');

			this.setState({
				isLoading: false,
				results: _.filter(uniList.data, result => re.test(result.name)).map(
					//restruncturing the elements to conform to "Search standards"
					element => {
						return {
							title: element.name,
							description: element.description,
							image: element.image,
							id: element.id,
							details: { ...element },
						};
					}
				),
			});
		}, 300);
	};

	handleFavouritesChange = (universityId: string, add?: boolean) => {
		console.log('favourites handles');

		this.setState({ triggerRerender: !this.state.triggerRerender });
	};

	render() {
		const {
			isLoading,
			results,
			value,
			selection,
			showCard,
			//isModalOpen,
		} = this.state;

		return (
			<div>
				<Search
					fluid
					loading={isLoading}
					results={results}
					value={value}
					onResultSelect={this.handleResultSelect}
					onSearchChange={_.debounce(this.handlesearchChange, 500, {
						leading: true,
					})}
					onFavouriteBottonClick={this.handleFavouritesChange}
				/>
				{showCard ? (
					<DiscoverCard
						content={selection}
						show={showCard}
						favourite={this.props.user.favouriteUnis.indexOf(selection.id) > -1}
						onFavouriteButtonClick={this.handleFavouritesChange}
					/>
				) : (
					this.props.uniList.data.map((university: any) => {
						var isFavourite = false;
						if (this.props.user.favouriteUnis === []) {
							isFavourite = false;
						} else {
							if (this.props.user.favouriteUnis.indexOf(university.id) > -1) {
								isFavourite = true;
							}
						}
						return (
							<DiscoverCard
								content={university}
								show={!showCard}
								favourite={isFavourite}
								onFavouriteButtonClick={this.handleFavouritesChange}
							/>
						);
					})
				)}

				{/*<DiscoverModal open={isModalOpen} content={selection} onClose={this.handleModalClose}/>*/}
			</div>
		);
	}
}

export const DiscoverComponentComposed: React.ComponentClass<any> = compose(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(DiscoverComponent);
