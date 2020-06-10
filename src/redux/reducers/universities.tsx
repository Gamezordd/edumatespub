import * as ActionTypes from '../ActionTypes';

export const Universities = (
	state = {
		data: Array<any>(),
	},
	action: any
) => {
	switch (action.type) {
		case ActionTypes.FETCH_UNIVERSITIES: {
			return { ...state, data: action.payload }
		}
		default:{
			return state
		}
	}
};
