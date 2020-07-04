import React, { useState } from "react";
import { DiscoverContainerComposed } from "../discover";
import { Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { EmptyContainer } from "../discover/EmptyContainer";

const mapStateToProps = (state: any) => {
	return {
		favourites: state.user.favouriteUnis,
	};
};

export const FavouritesComponentPlain = (props: any) =>{
    var [isModalOpen, setOpen] = useState(false);
    return(
        <React.Fragment>
            {props.favourites.length > 0 ? <DiscoverContainerComposed onlyFavourites={true} /> : <div style={{paddingTop:"10%"}}><EmptyContainer/></div>}
            
            <Modal open={isModalOpen} onClose={() => setOpen(!isModalOpen)}>
                <Modal.Header>
                    Favourite Universities
                </Modal.Header>
                <Modal.Content>
                    {props.favourites.length > 0 ? <DiscoverContainerComposed onlyFavourites={true}/> : <div style={{paddingTop:"200px"}}>what</div>}
                </Modal.Content>
            </Modal>
        </React.Fragment>
    )
}

export const FavouritesComponent = connect(mapStateToProps, null)(FavouritesComponentPlain);