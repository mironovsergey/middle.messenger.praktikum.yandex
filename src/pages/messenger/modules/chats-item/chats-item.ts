import type { TChat } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import { API_URL } from '../../../../utils/constants';
import ChatsController from '../../../../controllers/chats-controller';
import Block from '../../../../services/block';
import Button from '../../../../components/button';
import Store from '../../../../services/store';
import { diffDays, declension } from '../../../../utils';

import template from './chats-item.hbs';

import './chats-item.scss';

import iconXmark from '../../../../images/icons/xmark.svg';
import noimage from '../../../../images/noimage.jpg';

type TChatsItem = {
    avatar: string;
    time?: string;
    message?: string;
    active?: boolean;
    button: Button;
} & Omit<TChat, 'avatar'> & TBlockProps;

export default class ChatsItem extends Block<TChatsItem> {

    constructor(props: TChat) {
        // Активность
        const state = Store.getInstance().getState();
        const { chat }: { chat?: TChat } = state;
        let active = false;

        if (chat && chat.id === props.id) {
            active = true;
        }

        // Дата и время
        let time;

        if (props.last_message) {
            const timeString = props.last_message.time;
            const timeStamp = new Date(timeString).getTime();
            const days = diffDays(new Date(timeStamp), new Date());

            time = days === 0
                ? new Date(timeStamp).toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' })
                : days === 1 ? 'Вчера' : `${days} ${declension(days, 'день,дня,дней')} назад`;
        }

        // Сообщение
        let message;

        if (props.last_message) {
            message = props.last_message.content;
        }

        // Аватар
        const avatar = props.avatar ? `${API_URL}/resources${props.avatar}` : noimage;

        super({
            ...props,
            time,
            message,
            avatar,
            active,
            button: new Button({
                type: 'button',
                text: iconXmark,
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        ChatsController.deleteChats({ chatId: props.id });
                    }
                }
            }),
            events: {
                click: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    Store.getInstance().set('chat', props);
                    ChatsController.getUsers({ id: props.id });
                }
            }
        });
    }

    render() {
        return this.compile(template);
    }

}
