import React from 'react';
import { compose } from 'redux';
import { withFirebase } from '../../firebase/withFirebase';
import { connect } from 'react-redux';
import { Firebase } from '../../firebase';
interface IState{

}

interface IProps{
    firebase: Firebase,
    user: any
}

const mapStateToProps = (state: any) => {
	return {
        user: state.user,
        chat: state.chat
	};
};

class ChatComponent extends React.Component<IProps, IState>{

    componentDidMount(){
        const rtdbMessageRef = this.props.firebase.rtdb.ref('Chats/')
        
        rtdbMessageRef.on('value', (snapshot: any) => {
            const data: any = snapshot.val();
            let payload: object[] = []
            Object.keys(data).forEach(key => {
                console.log("key: ", key, data[key]);
                if(data[key]["reciever"] === this.props.user.uid || data[key]["sender"] === this.props.user.uid){
                    payload = payload.concat(data[key]);
                }
            })
        })
    }

    constructor(props: IProps){
        super(props);
        this.state={
            sata: 1
        }
    }
    render(){
        return null
    }

}

export const ChatComponentComposed = compose<any>(
    withFirebase,
    connect(mapStateToProps, null)
)(ChatComponent)