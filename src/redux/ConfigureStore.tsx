import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { User } from './reducers';

/*ConfigureStore() returns redux store with reducers combined and middlewares applied*/

export const ConfigureStore = (): Store => {
	const store = createStore(
		combineReducers({
			user: User,
		}),
		applyMiddleware(thunk)
	);
	return store;
};
