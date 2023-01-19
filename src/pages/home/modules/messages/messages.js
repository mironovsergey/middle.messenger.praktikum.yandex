import { formatDate } from '../../../../utils/helpers';

import messagesItem from '../messages-item';

import template from './messages.hbs';

import './messages.scss';

export default (messagesArray) => {
    // Сортировка сообщений по дате и времени
    messagesArray.sort((a, b) => (
        a.time > b.time ? 1 : (a.time < b.time ? -1 : 0)
    ));

    // Группировка сообщений по дате
    const messageGroups = messagesArray.reduce((acc, curr) => {
        const date = formatDate(curr.time);

        return { ...acc, [date]: [...(acc[date] ?? []), curr] };
    }, {});

    // Список сообщений, разделенных датами
    const messageList = Object.entries(messageGroups).reduce((acc, [date, items]) => ([
        ...acc,
        `<div class="messages-date">${date}</div>`,
        ...items.map((item) => messagesItem(item))
    ]), []);

    return template({ messageList });
};