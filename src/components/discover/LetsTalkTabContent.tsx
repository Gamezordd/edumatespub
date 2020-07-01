import React from 'react';
import { Grid } from 'semantic-ui-react';
import YouTube from 'react-youtube';
import { LoadingContainer } from '../maps';
import { EmptyContainer } from './EmptyContainer';

interface IState{
    isLoading: boolean;
    elementWidth: string | undefined
}

interface IProps{
    videoURL: string;
    loading: (loading: boolean) => void
}

export class LetsTalkTabContent extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state={
            isLoading: true,
            elementWidth: undefined
        }
    }

    componentDidMount(){
        this.getWidth();
    }
    getWidth(){
		if(document.getElementById('ytdiv')){
            const elementWidth = document.getElementById('ytdiv')?.offsetWidth.toString();
            this.setState({elementWidth: elementWidth, isLoading: false})
		}
    }
    handleReady(){
        this.props.loading(false);
    }
    render(){
        const domainName = (/^.*\//.exec(this.props.videoURL))
        var videoId = ''
        if(domainName){
            videoId = this.props.videoURL.substring(domainName[0].length)
        }
        if(this.state.isLoading){
            this.props.loading(true);
            return <div id="ytdiv"><LoadingContainer/></div>
        }
        else if(this.state.elementWidth && domainName){
            return(
                <Grid.Row centered verticalAlign="middle">
                    <Grid.Column>
                        <YouTube
                            videoId={videoId}
                            opts={{
                                width: this.state.elementWidth
                            }}
                            onReady={() => this.handleReady()}
                            />
                    </Grid.Column>
                </Grid.Row>
            )
        }
        else{
            return <div style={{height:"60%"}}><EmptyContainer/></div>
        }   
    }
}