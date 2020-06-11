import React from 'react';
import { Search, SearchProps, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { editFavouritesAction } from '../../redux';

import { /*DiscoverModal*/ } from './index';
import { DiscoverProps, initialStateProps } from './interfaces';
import { initialState } from './constants';
import { CardContainerComponent } from './CardContainerComponent';

const mapStateToProps = (state: any) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: any) => ({
	editFavourites: (payload: object) => dispatch(editFavouritesAction(payload)),
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
		//Seperate function because modal may not always be dismissable
		this.setState({ isModalOpen: false });
	};

	handlesearchChange = (
		e: React.MouseEvent<HTMLElement, MouseEvent>,
		{ value }: SearchProps
	) => {
		console.log("value: ", this.state);
		
		const { uniList } = this.props;
		this.setState({ isLoading: true, value });
		setTimeout(() => {
			if (this.state.value) {
				if (this.state.value.length < 1) {
					return this.setState(initialState);
				}
			} else {
				console.log("reset");
				
				return this.setState(initialState)
			}
			const re = new RegExp(_.escapeRegExp(this.state.value), 'i');

			this.setState({
				isLoading: false,
				results: _.filter(uniList.data, result => re.test(result.name)).map(
					//restruncturing the elements to conform to "Search" standards
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

	handleFavouritesChange = (universityId: string[], add?: boolean) => {
		this.props.firebase
			.editFavourites(this.props.user.uid, universityId, add)
			.then(() => {
				this.setState({ triggerRerender: !this.state.triggerRerender });
				this.props.editFavourites({ ids: universityId, add: add });
			});
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
				<Grid columns={5} container>
					<Grid.Column/>
					<Grid.Column/>
					<Grid.Column>
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
					</Grid.Column>
					<Grid.Column/>
					<Grid.Column/>
				</Grid>
				<CardContainerComponent
					data={this.props.uniList.data}
					selected={showCard}
					onFavouriteButtonClick={this.handleFavouritesChange}
					selectedCardData={selection}
					favouriteUnis={this.props.user.favouriteUnis}
				/>
				{/*<DiscoverModal open={isModalOpen} content={selection} onClose={this.handleModalClose}/>*/}
			</div>
		);
	}
}

export const DiscoverComponentComposed: React.ComponentClass<any> = compose(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(DiscoverComponent);
