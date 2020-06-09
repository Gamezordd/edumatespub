import * as ActionTypes from '../ActionTypes';

export const Universities = (
	state = {
		data: Array<object>(),
	},
	action: any
) => {
	switch (action.type) {
		case ActionTypes.EDIT_FAVOURITES: {
			const { payload, add } = action;
			if (add) {
				return { ...state, data: state.data.concat(payload) };
			} else {
				payload.map((favourite: object) => {
					if (favourite) {
						state.data.splice(state.data.indexOf(favourite));
						return state.data;
					} else {
						return { ...state, data: state.data };
					}
				});
				return { ...state, data: state.data };
			}
		}
		default:{
			return {...state}
		}
	}
};
