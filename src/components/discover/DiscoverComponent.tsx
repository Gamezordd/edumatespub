import React from 'react';
import {
	Search,
	SearchProps,
	Grid,
	Modal,
	Placeholder,
} from 'semantic-ui-react';
import _ from 'lodash';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { editFavouritesAction } from '../../redux';

import { DiscoverModal } from './index';
import { DiscoverProps, initialStateProps } from './interfaces';
import { initialState, searchDescriptionLength } from './constants';
import { CardContainerComponent } from './CardContainerComponent';
import { ChatModal } from './ChatModal';

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

	formatDescription(description: string) {
		if (description.length > searchDescriptionLength) {
			return description.substring(0, searchDescriptionLength) + '...';
		} else {
			return description;
		}
	}

	setChat = (id: string) => {
		this.setState({ showChat: id });
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
			} else {
				return this.setState(initialState);
			}
			const re = new RegExp(_.escapeRegExp(this.state.value), 'i');

			this.setState({
				results: _.filter(uniList.data, result => re.test(result.name)).map(
					//restruncturing the elements to conform to "Search" standards
					element => {
						return {
							title: element.name,
							description: this.formatDescription(element.description),
							image: element.image,
							id: element.id,
							details: { ...element },
						};
					}
				),
				isLoading: false,
			});
		}, 300);
	};

	handleFavouritesChange = (universityId: string[], add?: boolean) => {
		if (this.props.user.favouriteUnis.length >= 10 && add) {
			alert('You may only select upto 10 universities');
		} else {
			this.props.firebase
				.editFavourites(this.props.user.uid, universityId, add)
				.then(() => {
					this.setState({ triggerRerender: !this.state.triggerRerender });
					this.props.editFavourites({ ids: universityId, add: add });
				});
		}
	};

	handleClick = (
		place: Array<{
			lat: number;
			lng: number;
			details: {
				name: string;
				description: string;
				image: string;
				videoURL: string;
				department: [{ name: string; link: string }];
				FAQLink: string;
			};
		}>
	) => {
		this.setState({ places: place, isModalOpen: true });
	};

	render() {
		const {
			isLoading,
			results,
			value,
			selection,
			showCard,
			isModalOpen,
			places,
		} = this.state;

		const SearchBar = (
			<Search
				input={{ fluid: true }}
				size='big'
				fluid
				aligned='left'
				loading={isLoading}
				results={results}
				value={value}
				onResultSelect={this.handleResultSelect}
				onSearchChange={_.debounce(this.handlesearchChange, 500, {
					leading: true,
				})}
				onFavouriteBottonClick={this.handleFavouritesChange}
			/>
		);

		const SearchPlaceholder = (
			<React.Fragment>
				<Placeholder>
					<Placeholder.Line length='full' />
				</Placeholder>
			</React.Fragment>
		);

		const RenderSearchBar = (
			<React.Fragment>
				{isLoading ? SearchPlaceholder : SearchBar}
			</React.Fragment>
		);

		return (
			<div>
				<Grid centered columns={1} container>
					<div style={{ flex: 1, justifyContent: 'center' }}>
						<Grid.Column>
							{this.props.onlyFavourites ? null : RenderSearchBar}
						</Grid.Column>
					</div>
				</Grid>
				<CardContainerComponent
					data={this.props.uniList.data}
					selected={showCard}
					onFavouriteButtonClick={this.handleFavouritesChange}
					selectedCardData={selection}
					favouriteUnis={this.props.user.favouriteUnis}
					onCardClick={this.handleClick}
					onlyFavourites={this.props.onlyFavourites}
					setChat={this.setChat}
				/>
				<DiscoverModal
					open={isModalOpen}
					content={places}
					onClose={this.handleModalClose}
				/>
				<Modal
					open={this.state.showChat !== null}
					onClose={() => this.setState({ showChat: null })}
				>
					<ChatModal universityId={this.state.showChat} />
				</Modal>
			</div>
		);
	}
}

export const DiscoverComponentComposed: React.ComponentClass<any> = compose(
	withFirebase,
	connect(mapStateToProps, mapDispatchToProps)
)(DiscoverComponent);
