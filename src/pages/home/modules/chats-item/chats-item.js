import { diffDays, declension } from '../../../../utils/helpers';

import template from './chats-item.hbs';

import './chats-item.scss';

export default ({ time, ...props }) => {
    const days = diffDays(new Date(time), new Date());

    time = days === 0
        ? new Date(time).toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' })
        : days === 1 ? 'Вчера' : `${days} ${declension(days, 'день,дня,дней')} назад`;

    return template({ time, ...props });
};
