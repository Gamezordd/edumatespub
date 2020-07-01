import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

interface IProps{
    link: string
}

export const FAQTabContent = (props: IProps) =>{
    return(
        <Grid.Row>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Button>Visit University FAQ</Button>
            </div>
        </Grid.Row>
    )
}