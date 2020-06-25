import React, { useState } from "react";
import { DiscoverContainerComposed } from "../discover";
import { Button, Modal } from "semantic-ui-react";

export const FavouritesComponent = (props: any) =>{
    var [isModalOpen, setOpen] = useState(false);

    return(
        <React.Fragment>
            <DiscoverContainerComposed onlyFavourites={true} />
            <div>
                <Button onClick={() => setOpen(!isModalOpen)}>Show in Modal</Button>
            </div>
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