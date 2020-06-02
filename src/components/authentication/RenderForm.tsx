import React from 'react';
import { RegistrationFormFields, LoginFormFields } from './FormFields';
import { FormInput, Form, Button } from 'semantic-ui-react';
import { CustomInputProps } from './CustomProps';

interface field {
	id: string;
	value: string;
}

export class RenderForm extends React.Component {
	state: any = {
		fields: [],
		errors: [],
		registrationPage: 1,
		setFields: [],
	};

	props: any = {};

	handleChange(e: React.ChangeEvent<HTMLInputElement>, minLength?: number) {
		console.log(this.props.location.pathname);

		var { fields } = this.state;
		if (fields.length === 0) {
			this.setState({
				fields: fields.concat({ id: e.target.id, value: e.target.value }),
			});
		} else {
			this.state.fields.map((el: field, index: number) => {
				if (el.id === e.target.id) {
					let items = fields;
					let item = { id: e.target.id, value: e.target.value };
					items.splice(index, 1, item);
					this.setState({ fields: items });
				} else {
					this.setState({
						fields: fields.concat({ id: e.target.id, value: e.target.value }),
					});
				}
			});
		}
	}

	setFields(pathname: string) {
		if (pathname === '/register') {
			const currentFields = RegistrationFormFields[this.state.registrationPage];
			if (this.state.setFields !== currentFields) {
				this.setState({ setFields: currentFields });
			}
		} else if (
			pathname === '/login' &&
			this.state.setFields !== LoginFormFields
		) {
			this.setState({ setFields: LoginFormFields });
		}
	}

	render() {
		this.setFields(this.props.location.pathname); //Sets the form fields to  be rendered

		const formFields = this.state.setFields.map((field: CustomInputProps) => {
			//Render Form fields
			if (field.fieldType === 'input') {
				return (
					<Form.Field>
						<label>{field.label}</label>
						<FormInput
							id={field.id}
							placeholder={field.placeholder}
							onChange={e => this.handleChange(e, field.minLength)}
						/>
					</Form.Field>
				);
			} else if (field.fieldType === 'button') {
				return (
					<Form.Field>
						<Button
							color={field.buttonColor}
							onClick={() => {}}
							basic={field.basic}
						>
							{field.label}
						</Button>
					</Form.Field>
				);
			}
		});

		return (
			//Returns the rendered form
			<div>{formFields}</div>
		);
	}
}
