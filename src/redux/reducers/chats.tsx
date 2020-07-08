import * as ActionTypes from '../ActionTypes';
import { ChatActions } from '../ActionCreators';

export interface UserChat {
	chat: string;
	lastActive: number;
	latest: string;
	name: string;
}

interface ChatStore {
	chatList: { [uid: string]: UserChat };
}

export const Chats = (
	state: ChatStore = { chatList: {} },
	action: ChatActions
) => {
	switch (action.type) {
		case ActionTypes.APPEND_CHAT: {
			const { name, lastActive, latest, chat } = action.chat;
			return {
				...state,
				chatList: {
					...state.chatList,
					[action.chat.id]: { name, lastActive, latest, chat },
				},
			};
		}
	}
};
