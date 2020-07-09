import React, { useState} from 'react';
import {
	Modal,
	Image,
	Icon,
	Grid,
	Button,
	DropdownProps,
	Tab,
} from 'semantic-ui-react';
import { placesFilterOptions } from './constants';
import { NearbyTabContent } from './NearbyTabContent';
import { LetsTalkTabContent } from './LetsTalkTabContent';
import { DepartmentsTabContent } from './DepartmentsTabContent';
import { FAQTabContent } from './FAQTabContent';
interface IProps {
	open: boolean;
	content: Array<{
		lat: number;
		lng: number;
		details: { name: string; description: string; image: string, videoURL: string, department: [{name: string, link: string}], FAQLink: string };
	}>;
	onClose: () => void;
}

export const DiscoverModal = (props: IProps) => {
	const { open, content, onClose } = props;
	const { innerWidth } = window;
	const [searchValue, setSearch] = useState('none');
	const [tabLoading, setTabLoading] = useState(false)

	function handleDropdownChange(
		e: React.SyntheticEvent<HTMLElement, Event>,
		d: DropdownProps
	) {
		if (d.value) {
			setSearch(d.value.toString());
		}
	}

	const desktopRow = (
		<Grid.Row>
			<Grid.Column width='5'>
				<Image
					wrapped
					size='medium'
					src={content[0] ? content[0].details.image : ''}
				/>
			</Grid.Column>
			<Grid.Column width='11'>
				<div style={{ marginBottom: '5%' }}>
					{content[0]
						? content[0].details.description
						: 'Description Not found'}
				</div>
			</Grid.Column>
		</Grid.Row>
	);

	const mobileRow = (
		<Grid.Row>
			<Grid.Column width='16'>
				<div style={{ marginBottom: '5%' }}>
					{content[0]
						? content[0].details.description
						: 'Description Not found'}
				</div>
			</Grid.Column>
		</Grid.Row>
	);

	const handleClose = () => {
		console.log(content);
		
		setSearch('none');
		onClose();
	};

	function handleTabLoading(loading: boolean){
		if(loading){
			console.log("loading");
			
			return setTabLoading(true);
		}
		else{ 
			console.log("done loading");
			
			return setTabLoading(false);
		}
	}
	
	function populatePanes(){ 		//Prerender the Tabbed view
		let currentPanes=[
			{ menuItem: 'Nearby', render: () => <Tab.Pane> <NearbyTabContent placesOptions={placesFilterOptions} dropdownHandler={handleDropdownChange} placesProps={content} searchValueProps={searchValue} /> </Tab.Pane> },
		]
		const letsTalkPane = { menuItem: "Let's Talk", render: () => <Tab.Pane loading={tabLoading}><LetsTalkTabContent loading={handleTabLoading} videoURL={content[0].details.videoURL}/></Tab.Pane> }
		const FAQPane = { menuItem: 'FAQ', render: () => <Tab.Pane><FAQTabContent link={content[0].details.FAQLink}/></Tab.Pane> }
		const DepartmentsPane = { menuItem: 'Departments', render: () => <Tab.Pane> <DepartmentsTabContent departments={content[0].details.department} /> </Tab.Pane> }

		if(content[0].details.videoURL){
			currentPanes = currentPanes.concat(letsTalkPane);
		}
		if(content[0].details.FAQLink){
			currentPanes = currentPanes.concat(FAQPane);
		}
		if(content[0].details.department){
			currentPanes = currentPanes.concat(DepartmentsPane);
		}
		return currentPanes;
	}

	return (
		<div style={{ position: 'absolute' }}>
			<Modal open={open} onClose={handleClose}>
				<Modal.Header onClick={handleClose}>
					<Icon name='chevron circle left' />
					{content[0] ? content[0].details.name : 'Name not found'}
				</Modal.Header>
				<Modal.Content scrolling>
					<Grid columns='16'>
						{innerWidth > 600 ? desktopRow : mobileRow}
						<Grid.Column width="16">
							{open ? <Tab panes={populatePanes()} /> : null}
						</Grid.Column>
					</Grid>
				</Modal.Content>
				<Modal.Actions>
					<Button primary>Chat</Button>
					<Button primary>Learn More</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};
