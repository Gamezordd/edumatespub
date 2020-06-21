import * as ActionTypes from '../ActionTypes';

export const Chat = (
	state = {
		messages: Array<any>(),
	},
	action: any
) => {
	switch (action.type) {
		case ActionTypes.ADD_CHATS:{
			return {messages: state.messages.concat(action.payload)}
		}
		default:{
			return state
		}
	}
};
