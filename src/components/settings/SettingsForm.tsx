import React from 'react';
import { countryOptions } from '../forms'
import { Firebase } from '../../firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { firestore } from 'firebase';
import { Redirect } from 'react-router-dom';
import { LoadingContainer } from '../maps';

interface IProps {
    firebase: Firebase;
    user : any;
}

interface IState {
    fields: object;
    isLoading: boolean
}

const mapStateToProps = (state: any) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: any) => ({
	
});
class SettingsForm extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state={
            fields:{},
            isLoading: false
        }
    }

    componentDidMount(){
        if(this.props.user.isLoggedIn){
            this.setState({isLoading: true})
            this.props.firebase.fetchUser(this.props.user.uid).then((response: any) => {
                console.log("response: ", response);
               this.setState({fields: response, isLoading: false})
            })
        }      
        console.log("object: ", this.state.fields);  
    }

    renderForm(fields: object){
        return(
            null
        )
    }

    render(){
        const { isLoading, fields } = this.state

        if(!this.props.user.isLoggedIn){
            return(
                <Redirect to='/login'/>
            )
        }
        else if(isLoading){
            return(
                <LoadingContainer/>
            )
        }
        return(
            <div>
                {this.renderForm(fields)}
            </div>
        )
    }
}

export const SettingsFormComposed = compose<any, any>(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(SettingsForm)