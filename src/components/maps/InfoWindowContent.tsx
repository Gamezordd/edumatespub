import React from 'react';

export interface ContentProps {
	content: any;
}

export class InfoWindowContent extends React.Component<ContentProps>{
    
    render(){
        const {Name, Description} = this.props.content
        
        return(
            <div>
                {Name}
                {Description}
            </div>
        )
    }
}
