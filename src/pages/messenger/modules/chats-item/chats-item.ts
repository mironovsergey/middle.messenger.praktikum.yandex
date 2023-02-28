import type { TChat } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import { diffDays, declension } from '../../../../utils';

import template from './chats-item.hbs';

import './chats-item.scss';

type TChatsItem = {
    time: string;
} & Omit<TChat, 'time'> & TBlockProps;

export default class ChatsItem extends Block<TChatsItem> {

    constructor(props: TChat) {
        const { time: timestamp } = props;
        const days = diffDays(new Date(timestamp), new Date());
        const time = days === 0
            ? new Date(timestamp).toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' })
            : days === 1 ? 'Вчера' : `${days} ${declension(days, 'день,дня,дней')} назад`;

        super({
            ...props,
            time
        });
    }

    render() {
        return this.compile(template);
    }

}
