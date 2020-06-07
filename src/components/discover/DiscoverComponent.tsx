import React from "react";
import { Search, SearchProps, Modal, Image, Card } from "semantic-ui-react";
import _ from 'lodash';

import { DiscoverCard, DiscoverModal } from "./index";

interface DiscoverProps{
    uniList:any
}

const initialState = { 
    isModalOpen: false, 
    showCard: false,
    isLoading: false, 
    results: [], 
    value:'',
    selection: {
        title:'',
        image:'',
        description:''
    }
}

export class DiscoverComponent extends React.Component<DiscoverProps>{
    
    state = initialState

    handleResultSelect = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        {result}: SearchProps

    ) => {

        this.setState({ showCard: true, selection: result })

    }

    handleModalClose = () => {                                  //Seperate function because modal may not always need closing
        this.setState({isModalOpen: false})
    }

    handlesearchChange = (
        e: React.MouseEvent<HTMLElement, MouseEvent>, 
        {value}: SearchProps

    ) => {
        const {uniList} = this.props;

        this.setState({isLoading: true, value})
        setTimeout(() => {
            if (this.state.value.length < 1) {
                return this.setState(initialState)
            }

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')

            this.setState({
                isLoading: false,
                results:  _.filter(uniList, (result) => re.test(result.title)),
            })
        },300)
    }

    render(){
        const {isLoading, results, value, selection, showCard, isModalOpen} = this.state
        return(
            <div>
            <Search
                fluid
                loading={isLoading}
                results={results}
                value={value}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handlesearchChange, 500, {
                    leading:true,
                })}
                />
            <DiscoverCard content={selection} show={showCard}/>
            {/*<DiscoverModal open={isModalOpen} content={selection} onClose={this.handleModalClose}/>*/}
            </div>
        )
    }
}