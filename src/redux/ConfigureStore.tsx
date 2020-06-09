import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { User } from './reducers';
import { Universities } from './reducers/universities';

/*ConfigureStore() returns redux store with reducers combined and middlewares applied*/

export const ConfigureStore = (): Store => {
	const store = createStore(
		combineReducers({
			user: User,
			universities: Universities
		}),
		applyMiddleware(thunk)
	);
	return store;
};
