import React from 'react';
import { countryOptions } from '../forms'
import { Firebase } from '../../firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { firestore } from 'firebase';
import { Redirect } from 'react-router-dom';
import { LoadingContainer } from '../maps';
import { Dropdown, Button, Modal, Grid } from 'semantic-ui-react';
import ReactCrop from 'react-image-crop';
import { PhotoModalComposed } from './PhotoModal';

interface IProps {
    firebase: Firebase;
    user : any;
}

interface IState {
    fields: any;
    isLoading: boolean;
    isPicModalOpen: boolean;
    picture: any
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
            fields: undefined,
            isLoading: false,
            isPicModalOpen: false,
            picture: undefined
        }
    }

    componentDidMount(){
        if(this.props.user.isLoggedIn){
            this.setState({isLoading: true})
            this.props.firebase.fetchUser("3jxJrADQbbWTB8QlC8oYiaPYZmj1").then((response: any) => {
               this.setState({fields: response, isLoading: false})
            })
        }   
    }
    
    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        console.log("val before check: ", e.target.value);
        
        if( !/[A-z]|[a-z]/.test(e.target.value.slice(e.target.value.length - 1, e.target.value.length))){
            console.log("val after check: ", e.target.value);
            this.setState({fields: {...this.state.fields, phone: e.target.value}})
        }
    }

    

    handleOnSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            const reader = new FileReader();
            reader.addEventListener('load', () =>{
                this.setState({picture: reader.result})
            })
            reader.readAsDataURL(e.target.files[0]);
        }
        
    }

    render(){
        const { isLoading, fields } = this.state

        if(!this.props.user.isLoggedIn) return <Redirect to='/login'/>
        else if(!isLoading && fields ){
            return(
                <React.Fragment>
                    <div style={{paddingTop: "100px"}}>
                        <label htmlFor="number">Number: </label>
                        <input id="number" type="tel" maxLength={14} onChange={(e) => this.handleChange(e)} value={this.state.fields.phone}/>
                        <PhotoModalComposed buttonText="Change Picture" uid={this.props.user.uid}/>
                    </div>
                    
                </React.Fragment>
            )
        }
        else{
            return(
                <LoadingContainer/>
            )
        }
    }
}

export const SettingsFormComposed = compose<any, any>(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(SettingsForm)