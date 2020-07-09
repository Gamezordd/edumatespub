import * as ActionTypes from '../ActionTypes';
import { ChatActions } from '../ActionCreators';

export interface UserChat {
	chat: string;
	lastActive: number;
	latest: string;
	name: string;
}

export interface ChatStore {
	current: any | undefined;
	chatList: { [uid: string]: UserChat };
}

export const Chats = (
	state: ChatStore = { current: undefined, chatList: {} },
	action: ChatActions
) => {
	switch (action.type) {
		case ActionTypes.SET_CHAT: {
			console.log('Setting', action.selectedChat);
			return { ...state, ...{ current: action.selectedChat } };
		}
		case ActionTypes.APPEND_CHAT: {
			const { name, lastActive, latest, chat, id } = action.chat;
			return {
				...state,
				chatList: {
					...state.chatList,
					[id]: { name, lastActive, latest, chat },
				},
			};
		}
		default: {
			return state;
		}
	}
};
