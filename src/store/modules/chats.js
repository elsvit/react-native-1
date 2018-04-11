// @flow
import findIndex from 'lodash/findIndex';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

import api from '../../api';
import { API_REQUEST } from '../apiAction';

import type { ApiRequest } from '../apiAction';

export const GET_CHATS: 'chats/GET_CHATS' = 'chats/GET_CHATS';
const GET_CHATS_SUCCESS: 'chats/GET_CHATS_SUCCESS' = 'chats/GET_CHATS_SUCCESS';
const GET_CHATS_FAILED: 'chats/GET_CHATS_FAILED' = 'chats/GET_CHATS_FAILED';
export const ADD_MESSAGE: 'chats/ADD_MESSAGE' = 'chats/ADD_MESSAGE';
export const GET_MESSAGES: 'chats/GET_MESSAGES' = 'chats/GET_MESSAGES';
const GET_MESSAGES_SUCCESS: 'chats/GET_MESSAGES_SUCCESS' = 'chats/GET_MESSAGES_SUCCESS';
const GET_MESSAGES_FAILED: 'chats/GET_MESSAGES_FAILED' = 'chats/GET_MESSAGES_FAILED';
export const SEND_MESSAGE: 'chats/SEND_MESSAGE' = 'chats/SEND_MESSAGE';
const SEND_MESSAGE_SUCCESS: 'chats/SEND_MESSAGE_SUCCESS' = 'chats/SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILED: 'chats/SEND_MESSAGE_FAILED' = 'chats/SEND_MESSAGE_FAILED';

type UserForChatT = {
  id: ?number,
  type: string,
  email: string,
  username: string,
  first_name: string,
  gender: string,
  state_id: number,
  city: string,
  last_name: ?string,
  address: ?string,
  contact_info: ?string,
  age: ?number,
  avatar: ?{
    url: ?string,
    thumb: {
      url: ?string,
    },
  },
};

export type ChatT = {
  id: ?number,
  user: Array<UserForChatT>,
  last_message: {
    content: ?string,
    user_id: number,
    created_at: number,
  },
  count_not_read: number,
  messages?: Array<{
    id: number,
    user_id: number,
    content: string,
    created_at: number,
  }>,
  pagination?: {
    page_size: number,
    page: number,
    total_pages: number,
  },
};

export type ChatsStateT = {
  data: Array<ChatT>,
  loading: boolean,
  error: ?string,
  loadingMessages: boolean,
  errorLoadingMessages: ?string,
  sendMessage: boolean,
  errorSendMessage: ?string,
};

type GetChatsAction = {|
  type: typeof GET_CHATS,
|};

type GetChatsSuccessAction = {|
  type: typeof GET_CHATS_SUCCESS,
  result: {
    data: Array<ChatT>,
  },
|};

type GetChatsFailureAction = {|
  type: typeof GET_CHATS_FAILED,
  error: string,
|};

type GetMessagesFailureAction = {|
  type: typeof GET_MESSAGES_FAILED,
  error: string,
|};

type GetMessagesAction = {|
  type: typeof GET_MESSAGES,
  loadingChatId: number,
|};

type GetMessagesSuccessAction = {|
  type: typeof GET_MESSAGES_SUCCESS,
  result: {
    data: Array<ChatT>,
  },
|};

type AddMessageAction = {|
  type: typeof ADD_MESSAGE,
  data: {
    chatId: number,
    messageId: number,
    createdAt: number,
    content: string,
  },
|};

type SendMessageFailureAction = {|
  type: typeof SEND_MESSAGE_FAILED,
  error: string,
|};

type SendMessageAction = {|
  type: typeof SEND_MESSAGE,
  loadingChatId: number,
|};

type SendMessageSuccessAction = {|
  type: typeof SEND_MESSAGE_SUCCESS,
  result: {
    data: Array<ChatT>,
  },
|};

type ChatsActions =
  | GetChatsAction
  | GetChatsSuccessAction
  | GetChatsFailureAction
  | GetMessagesAction
  | GetMessagesSuccessAction
  | GetMessagesFailureAction
  | AddMessageAction
  | SendMessageAction
  | SendMessageSuccessAction
  | SendMessageFailureAction;

const initialState: ChatsStateT = {
  data: [],
  loading: false,
  error: null,
  loadingMessages: false,
  errorLoadingMessages: null,
  sendMessage: false,
  errorSendMessage: null,
};

export default function chatsReducer(state: ChatsStateT = initialState, action: ChatsActions) {
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CHATS_SUCCESS: {
      if (action.result.data) {
        return {
          ...state,
          data: action.result.data,
          loading: false,
          error: null,
        };
      }
      return state;
    }

    case GET_CHATS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case GET_MESSAGES:
      return {
        ...state,
        loadingMessages: true,
        errorLoadingMessages: null,
      };

    case GET_MESSAGES_SUCCESS: {
      if (action.result.data && action.result.config.chatId) {
        const newState = { ...state };
        newState.loadingMessages = false;
        newState.errorLoadingMessages = null;
        if (!action.result.data.messages) {
          return state;
        }
        const newMessages = sortBy(action.result.data.messages, ['created_at'], ['desc']);
        const newMessagesLen = newMessages.length;
        if (!newMessagesLen) return state;
        const { chatId } = action.result.config;
        const ind = findIndex(state.data, val => val.id === chatId);
        if (!newState.data[ind].messages) {
          newState.data[ind].messages = [];
        } else {
          const stateMessagesLen = newState.data[ind].messages.length;
          if (!stateMessagesLen) {
            if (
              newState.data[ind].messages[stateMessagesLen - 1].id ===
              newMessages[newMessagesLen - 1].id
            ) {
              return state;
            }
          }
        }
        const curPage =
          state.data[ind].pagination && state.data[ind].pagination.page
            ? state.data[ind].pagination.page
            : 0;
        if (curPage && action.result.data.pagination.page > curPage) {
          let newStateMessages = newState.data[ind].messages;
          newStateMessages = [...newStateMessages, ...newMessages];
          newStateMessages = sortBy(newStateMessages, ['created_at'], ['desc']);
          newState.data[ind].messages = uniqBy(newStateMessages, 'id');
        } else {
          newState.data[ind].messages = [...newMessages];
          newState.data[ind].count_not_read = 0;
          const newMessagesLen = newMessages.length;
          if (newMessagesLen) {
            newState.data[ind].last_message = {
              content: newMessages[newMessages.length - 1].content,
              user_id: newMessages[newMessages.length - 1].user_id,
              created_at: newMessages[newMessages.length - 1].created_at,
            };
          }
        }
        newState.data[ind].pagination = action.result.data.pagination;
        return newState;
      }
      return state;
    }

    case GET_MESSAGES_FAILED:
      return {
        ...state,
        loadingMessages: false,
        errorLoadingMessages: action.error,
      };

    case ADD_MESSAGE: {
      const newState = { ...state };
      const { chatId, userId, messageId, createdAt, content } = action.data;
      const ind = findIndex(state.data, val => val.id === chatId);
      if (newState.data[ind] && state.data[ind].user[0].id) {
        if (!newState.data[ind].messages) {
          newState.data[ind].messages = [];
        }
        const myUserId = state.data[ind].user[0].id;
        newState.data[ind].messages.push({
          id: messageId,
          user_id: userId,
          created_at: createdAt,
          content,
        });
      }
      return newState;
    }

    case SEND_MESSAGE:
      return {
        ...state,
        sendingMessage: true,
        errorSendMessage: null,
      };

    case SEND_MESSAGE_SUCCESS: {
      if (action.result.data) {
        const newState = { ...state };
        newState.sendingMessage = false;
        newState.errorSendMessage = null;
        const { chatId } = action.result.config;
        const ind = findIndex(state.data, val => val.id === chatId);
        if (newState.data[ind]) {
          if (!newState.data[ind].messages) {
            newState.data[ind].messages = [];
          }
          newState.data[ind].messages.push(action.result.data);
        }
        return newState;
      }
      return state;
    }

    case SEND_MESSAGE_FAILED:
      return {
        ...state,
        sendingMessage: false,
        errorSendMessage: action.error,
      };

    default:
      return state;
  }
}

export function getChats() {
  return {
    type: API_REQUEST,
    types: [GET_CHATS, GET_CHATS_SUCCESS, GET_CHATS_FAILED],
    call: () => api().chats.get(),
  };
}

export function getMessages(chatId: number): ApiRequest<*> {
  return {
    type: API_REQUEST,
    types: [GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILED],
    call: () => api().chats.getMessages(chatId),
  };
}
export function addMessage({
  chatId,
  userId,
  messageId,
  createdAt,
  content,
}: {
  chatId: number,
  userId: number,
  messageId: number,
  createdAt: number,
  content: string,
}) {
  return {
    type: ADD_MESSAGE,
    data: { chatId, userId, messageId, createdAt, content },
  };
}

export function sendMessage({
  content,
  chatId,
}: {
  content: string,
  chatId: number,
}): ApiRequest<*> {
  return {
    type: API_REQUEST,
    types: [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILED],
    call: () =>
      api().chats.sendMessage({
        message: {
          content,
          chat_id: chatId,
        },
      }),
  };
}
