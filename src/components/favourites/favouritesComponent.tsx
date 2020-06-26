import React, { useState } from "react";
import { DiscoverContainerComposed } from "../discover";
import { Button, Modal } from "semantic-ui-react";

export const FavouritesComponent = (props: any) =>{
    var [isModalOpen, setOpen] = useState(false);

    return(
        <React.Fragment>
            <DiscoverContainerComposed onlyFavourites={true} />
            <Modal open={isModalOpen} onClose={() => setOpen(!isModalOpen)}>
                <Modal.Header>
                    Favourite Universities
                </Modal.Header>
                <Modal.Content>
                    <DiscoverContainerComposed onlyFavourites={true}/>
                </Modal.Content>
            </Modal>
        </React.Fragment>
    )
}