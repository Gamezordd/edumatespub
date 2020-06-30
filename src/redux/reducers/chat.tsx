import * as ActionTypes from '../ActionTypes';
import { ChatActions } from '../ActionCreators';

export const Chat = (
	state = {
		current: undefined,
	},
	action: ChatActions
) => {
	switch (action.type) {
		case ActionTypes.SET_CHAT: {
			console.log('Setting', action.selectedChat);
			return { ...state, ...{ current: action.selectedChat } };
		}
		default: {
			return state;
		}
	}
};
