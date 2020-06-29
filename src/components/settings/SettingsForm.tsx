import React from 'react';
import { countryOptions } from '../forms'
import { Firebase } from '../../firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase/withFirebase';
import { firestore } from 'firebase';
import { Redirect } from 'react-router-dom';
import { LoadingContainer } from '../maps';
import { Dropdown, Button, Modal, Grid, Form, Input } from 'semantic-ui-react';
import ReactCrop from 'react-image-crop';
import { PhotoModalComposed } from './PhotoCropModal';

interface IProps {
    firebase: Firebase;
    user : any;
}

interface IState {
    fields: any;
    isLoading: boolean;
    isPicModalOpen: boolean;
    updated: boolean;
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
            updated: false
        }
    }

    componentDidMount(){
        if(this.props.user.isLoggedIn){
            this.setState({isLoading: true})
            this.props.firebase.fetchUser(this.props.user.uid).then((response: any) => {
               this.setState({fields: response, isLoading: false})
            })
        }   
    }
    
    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        if( !/[A-z]|[a-z]/.test(e.target.value.slice(e.target.value.length - 1, e.target.value.length))){
            this.setState({fields: {...this.state.fields, phone: e.target.value,}, updated: false})
        }
    }

    handleUpdate(){
        console.log("fields: ", this.state.fields);
        
        this.props.firebase.updateUser(this.props.user.uid, this.state.fields).then(() => this.setState({updated: true}))
    }

    render(){
        const { isLoading, fields } = this.state

        if(!this.props.user.isLoggedIn) return <Redirect to='/login'/>
        else if(!isLoading && fields ){
            return(
                <Grid centered columns={1} style={{paddingTop:"100px"}}>
                    <Grid.Column width={8}>
                        <Form
                            style={{
                                backgroundColor: 'white',
                                border: '3px solid #f3f3f3',
                                borderRadius: '25px',
                                textAlign: 'left',
                                padding: '8%',
                            }}
                            >
                                <h3 style={{textAlign:"left"}}>Update Info</h3>
                                <Form.Group>
                                    <label htmlFor="number">Phone Number: </label>
                                    <input id="number" type="tel" maxLength={14} onChange={(e) => this.handleChange(e)} value={this.state.fields.phone}/>
                                </Form.Group>
                                <Form.Group>
                                    <PhotoModalComposed buttonText="Change Picture" uid={this.props.user.uid} location="profileImages"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button color={this.state.updated ? "green" : "facebook"} onClick={() => this.handleUpdate()}>Update</Button>
                                </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid>
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