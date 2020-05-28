import React from 'react';

import { FirebaseContext } from './firebase';

export const withFirebase = (Component: typeof React.Component) => (
	props: any
) => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
);
