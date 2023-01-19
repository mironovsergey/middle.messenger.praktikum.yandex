import chatsItem from '../chats-item';

import template from './chats.hbs';

export default (chatsArray) => {
    const chatList = chatsArray.map((item) => chatsItem(item));

    return template({ chatList });
};