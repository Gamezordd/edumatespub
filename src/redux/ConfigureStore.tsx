import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { User, Universities, Posts, Chat } from './reducers';

/*ConfigureStore() returns redux store with reducers combined and middlewares applied*/

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			user: User,
			universities: Universities,
			posts: Posts,
			chat: Chat
		}),
		applyMiddleware(thunk)
	);
	return store;
};
