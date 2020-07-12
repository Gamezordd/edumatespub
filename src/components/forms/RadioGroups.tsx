import React from 'react';
import { Radio, Form } from 'semantic-ui-react';
import { RegisterState } from './types';
interface RadioGroupsProps {
	handler: any;
	fieldname: any;
}

interface RadioGroupsState {
	selectedOption: any;
}

export class RadioGroups extends React.Component<
	RadioGroupsProps,
	RadioGroupsState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			selectedOption: '',
		};
	}

	handleChange = () => {
		setTimeout(
			() => this.props.handler(this.props.fieldname, this.state.selectedOption),
			100
		);
	};
	render() {
		return (
			<Form.Field onClick={this.handleChange}>
				<Radio
					style={{ padding: '5px' }}
					name={this.props.fieldname}
					value='1'
					label='1'
					checked={this.state.selectedOption === '1'}
					onChange={() => this.setState({ selectedOption: '1' })}
				></Radio>
				<Radio
					style={{ padding: '5px' }}
					name={this.props.fieldname}
					value='2'
					label='2'
					checked={this.state.selectedOption === '2'}
					onChange={() => this.setState({ selectedOption: '2' })}
				></Radio>
				<Radio
					style={{ padding: '5px' }}
					name={this.props.fieldname}
					value='3'
					label='3'
					checked={this.state.selectedOption === '3'}
					onChange={() => this.setState({ selectedOption: '3' })}
				></Radio>
				<Radio
					style={{ padding: '5px' }}
					name={this.props.fieldname}
					value='4'
					label='4'
					checked={this.state.selectedOption === '4'}
					onChange={() => this.setState({ selectedOption: '4' })}
				></Radio>
				<Radio
					style={{ padding: '5px' }}
					name={this.props.fieldname}
					value='5'
					label='5'
					checked={this.state.selectedOption === '5'}
					onChange={() => this.setState({ selectedOption: '5' })}
				></Radio>
			</Form.Field>
		);
	}
}
