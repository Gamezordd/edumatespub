import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { User } from "./user";
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User
        }),
        applyMiddleware(thunk)
    );
    return store;
}