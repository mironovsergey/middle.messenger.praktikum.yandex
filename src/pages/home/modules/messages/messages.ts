import type { TMessage } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import { formatDate } from '../../../../utils/helpers';
import MessagesItem from '../messages-item';
import MessagesDate from '../messages-date';

import template from './messages.hbs';

import './messages.scss';

type TMessages = {
    messageList: Array<MessagesDate | MessagesItem>
} & TBlockProps;

type TMessagesProps = {
    messagesData: TMessage[]
} & TBlockProps;

export default class Messages extends Block<TMessages> {

    constructor({ messagesData, ...props }: TMessagesProps) {
        // Сортировка сообщений по дате и времени
        messagesData.sort((a, b) => (
            a.time > b.time ? 1 : (a.time < b.time ? -1 : 0)
        ));

        // Группировка сообщений по дате
        const messageGroups: { [key: string]: TMessage[] } = messagesData.reduce((acc, curr) => {
            const date = formatDate(curr.time);

            // @ts-ignore
            return { ...acc, [date]: [...(acc[date] ?? []), curr] };
        }, {});

        // Список сообщений, разделенных датами
        const messageList = Object.entries(messageGroups).reduce((acc, [date, items]) => ([
            ...acc,
            new MessagesDate({ date }),
            ...items.map((item) => new MessagesItem(item))
        ]), []);

        super({
            ...props,
            messageList
        });
    }

    render() {
        return this.compile(template);
    }

}
