import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { User, Universities, Posts } from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Chats } from './reducers/chats';

const persistConfig = {
	key: 'user',
	storage: storage,
	whitelist: ['user', 'universities'], // which reducer want to store
	timeout: 16 * 60 * 60,
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		user: User,
		universities: Universities,
		posts: Posts,
		chat: Chats,
	})
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
