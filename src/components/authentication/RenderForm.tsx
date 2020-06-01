import React, { ChangeEvent } from 'react';
import {AmbassadorEssentialFields} from "./FormFields";
import { FormInput, Form, } from 'semantic-ui-react';

interface field{
    id: string;
    value: string;
}


export class RenderForm extends React.Component{

    state: any = {
        fields: [],
        errors: []
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var {fields} = this.state;

        if( fields.length === 0){
            this.setState({fields: fields.concat({id:e.target.id, value:e.target.value})});
            console.log(fields);
            
        }
        else{
            this.state.fields.map((el:field, index: number) => {
                console.log("id: ", e.target.id);
                
                if(el.id === e.target.id){
                    let items = fields;
                    let item = {id:e.target.id, value:e.target.value}
                    items.splice(index,1,item);
                    this.setState({fields: items})
                    console.log(fields);
                    
                }
                else{
                    this.setState({fields: fields.concat({id:e.target.id, value:e.target.value})});
                }
            })
        }
    }

    render(){
        const {fields, errors} = this.state

        const formFields = AmbassadorEssentialFields.map(field => {
            if(field.fieldType == "input"){
                return(
                    <Form.Field>
                    <label>{field.label}</label>
                    <FormInput id={field.id} placeholder={field.placeholder} onChange={this.handleChange} />
                    </Form.Field>
                )
            }
        })
        return(
            <div>
                {formFields}
            </div>
        )
    }
}