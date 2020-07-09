import React from 'react';
import { DropdownProps, Grid, Dropdown } from 'semantic-ui-react';
import { ModalMapContainer } from './ModalMapContainer';

interface IProps{
	id?:string;
    placesOptions:{
        key: string;
        value: string;
        text: string;
    }[];
    dropdownHandler: (e: React.SyntheticEvent<HTMLElement, Event>,d: DropdownProps) => void;
    placesProps: {
        lat: number;
        lng: number;
        details: {
            name: string;
            description: string;
            image: string;
        };
    }[];
    searchValueProps: string
}

export const NearbyTabContent = (props: IProps) => {
	const {placesOptions, placesProps, dropdownHandler, searchValueProps} = props;
    return(
        <React.Fragment>
			<Grid.Row columns='16'>
				<Grid.Column width='16'>
					<Dropdown
						placeholder='Filter'
						selection
						fluid
						options={placesOptions}
						onChange={(e, d) => dropdownHandler(e, d)}
					/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row verticalAlign='middle' columns='16' centered>
				<Grid.Column width='16'>
					<div style={{ position: 'relative', marginTop:"10px"}}>
						<ModalMapContainer
							places={placesProps}
							zoomProp={8}
							searchType={searchValueProps}
						/>
					</div>
				</Grid.Column>
				<Grid.Column />
			</Grid.Row>
		</React.Fragment>
    )
}