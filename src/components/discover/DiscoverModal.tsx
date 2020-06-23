import React, { useState } from 'react';
import {
	Modal,
	Image,
	Icon,
	Grid,
	Button,
	Dropdown,
	DropdownProps,
} from 'semantic-ui-react';
import { ModalMapContainer } from './ModalMapContainer';
import { placesFilterOptions } from './constants';

interface IProps {
	open: boolean;
	content: Array<{
		lat: number;
		lng: number;
		details: { name: string; description: string; image: string };
	}>;
	onClose: () => void;
}

export const DiscoverModal = (props: IProps) => {
	const { open, content, onClose } = props;
	const { innerWidth } = window;
	const [searchValue, setSearch] = useState('none');

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
		setSearch('none');
		onClose();
	};

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
						<Grid.Row columns='16'>
							<Grid.Column width='16'>
								<Dropdown
									placeholder='Filter'
									selection
									fluid
									options={placesFilterOptions}
									onChange={(e, d) => handleDropdownChange(e, d)}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row verticalAlign='middle' columns='16' centered>
							<Grid.Column width='16'>
								<div style={{ position: 'relative' }}>
									<ModalMapContainer
										places={content}
										zoomProp={8}
										searchType={searchValue}
									/>
								</div>
							</Grid.Column>
							<Grid.Column />
						</Grid.Row>
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
