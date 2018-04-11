// @flow
import type { ReqType } from '../index';
import API from '../base/api';

class ChatsAPI extends API {
  get() {
    return this.r({
      method: 'GET',
      url: '/chats',
    });
  }
  getMessages(id) {
    return this.r({
      method: 'GET',
      url: `/chats/${id}`,
      chatId: id,
    });
  }
  sendMessage(data) {
    return this.r({
      method: 'POST',
      url: '/messages',
      data,
      chatId: data.message.chat_id,
    });
  }
}

export default function(request: ReqType): ChatsAPI {
  return new ChatsAPI(request);
}
