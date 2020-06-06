import React from 'react';

export interface ContentProps{
    content :any
}

export class InfoWindowContent extends React.Component<ContentProps>{
    componentDidMount(){
        console.log("props: ", this.props.content);
        
    }
    render(){
        return(
            <div>
                {this.props.content.name.Name}
                {this.props.content.name.Description}
            </div>
        )
    }
}