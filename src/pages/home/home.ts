import type { TChat, TMessage } from '../../utils/types';
import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Dropdown from '../../components/dropdown';
import Chat from './modules/chat/chat';
import Message from './modules/message';
import Chats from './modules/chats';
import Messages from './modules/messages';
import Search from './modules/search';
import { getFormData } from '../../utils/helpers';

import template from './home.hbs';

import iconBars from 'bundle-text:../../../static/images/icons/bars.svg';
import iconDots from 'bundle-text:../../../static/images/icons/dots.svg';

type THome = {
    chat: Chat;
    message: Message;
    search: Search;
    chats: Chats;
    messages: Messages;
    profileDropdown: Dropdown;
    chatDropdown: Dropdown;
} & TBlockProps;

type THomeProps = {
    chatsData: TChat[];
    messagesData: TMessage[];
} & TBlockProps;

export default class Home extends Block<THome> {

    constructor({ chatsData, messagesData, ...props }: THomeProps) {
        super({
            ...props,
            chat: new Chat(chatsData[3]),
            message: new Message({
                events: {
                    submit: (event: SubmitEvent) => {
                        event.preventDefault();
                        event.stopPropagation();

                        console.log(getFormData(event.target as HTMLFormElement));
                    }
                }
            }),
            search: new Search(),
            chats: new Chats({ chatsData }),
            messages: new Messages({ messagesData }),
            profileDropdown: new Dropdown({
                icon: iconBars,
                active: true,
                items: [
                    {
                        icon: '/images/icons/user.svg',
                        text: 'Профиль'
                    },
                    {
                        icon: '/images/icons/exit.svg',
                        text: 'Выйти'
                    }
                ]
            }),
            chatDropdown: new Dropdown({
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
            })
        });
    }

    render() {
        return this.compile(template);
    }

}
