import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

interface IProps {
	departments: [{ name: string; link: string }];
}

export const DepartmentsTabContent = (props: IProps) => {
	return (
		<Grid.Row>
			<Grid.Column>
				{props.departments.map(dep => {
					return (
						<Button
							style={{ margin: '5px' }}
							onClick={() => window.open(dep.link, '_blank')}
						>
							{' '}
							{dep.name}{' '}
						</Button>
					);
				})}
			</Grid.Column>
		</Grid.Row>
	);
};
