import dropdown from '../../components/dropdown';

import chats from './modules/chats';
import messages from './modules/messages';
import chat from './modules/chat/chat';
import message from './modules/message';
import search from './modules/search';

import template from './home.hbs';

import iconBars from 'bundle-text:../../../static/images/icons/bars.svg';
import iconDots from 'bundle-text:../../../static/images/icons/dots.svg';

const profileDropdown = {
    icon: iconBars,
    active: true,
    items: [
        {
            text: 'Профиль'
        },
        {
            text: 'Выйти'
        }
    ]
};

const chatDropdown = {
    icon: iconDots,
    active: true,
    right: true,
    items: [
        {
            icon: '/images/icons/plus.svg',
            text: 'Добавить пользователя'
        },
        {
            icon: '/images/icons/xmark.svg',
            text: 'Удалить пользователя'
        }
    ]
};

export default ({ chatsArray, messagesArray }) => {
    return template({
        chat: chat(chatsArray[3]),
        message: message(),
        search: search(),
        chats: chats(chatsArray),
        messages: messages(messagesArray),
        profileDropdown: dropdown(profileDropdown),
        chatDropdown: dropdown(chatDropdown)
    });
};
