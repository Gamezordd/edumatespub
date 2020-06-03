import * as ActionTypes from './ActionTypes';

export const exampleAction = () => ({
	type: ActionTypes.EXAMPLE_ACTION,
});

export const loginAction = (payload: object) => {
	({
		type: ActionTypes.LOGIN_ACTION,
		payload: payload,
	});
};
