import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { Firebase, FirebaseContext } from './firebase';
import { Provider } from 'react-redux';
import { ConfigureStore } from './components/redux';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={ConfigureStore()}>
			<FirebaseContext.Provider value={new Firebase()}>
				<App />
			</FirebaseContext.Provider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
