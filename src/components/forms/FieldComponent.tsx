import React from 'react';
import { FormField, InputProps, Form } from 'semantic-ui-react';

export interface FieldProps {
	properties: InputProps;
	validation: string;
	errorMessage: string;
}

interface FieldError {
	content: string;
	pointing: 'below';
}

interface FieldState {
	value: string;
	error: FieldError | null;
}

export class Field extends React.Component<FieldProps, FieldState> {
	constructor(props: FieldProps) {
		super(props);
		this.state = { value: '', error: null };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (RegExp(this.props.validation).test(e.target.value)) {
			this.setState({ value: e.target.value, error: null });
		} else {
			this.setState({
				error: { pointing: 'below', content: this.props.errorMessage },
			});
		}
	};

	render() {
		return (
			<Form.Field
				{...this.props.properties}
				error={this.state.error}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					this.handleChange(e)
				}
			/>
		);
	}
}
