import React from 'react';

export interface ContentProps{
    content :any
}

export class InfoWindowContent extends React.Component<ContentProps>{
    render(){
        return(
            <div>
                {this.props.content.name}
            </div>
        )
    }
}