import React from 'react';

export interface ContentProps {
	content: any;
}

export class InfoWindowContent extends React.Component<ContentProps>{
    
    render(){
        if(this.props.content.name)
        {
            const {name, description} = this.props.content.name
        return(
            <div>
                <strong>{name}</strong><br/>
                {description}
            </div>
        )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}
