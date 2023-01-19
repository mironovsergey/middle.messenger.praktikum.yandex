import template from './messages-item.hbs';

import './messages-item.scss';

import iconCheck from 'bundle-text:../../../../../static/images/icons/check.svg';

export default ({ time, self, ...props }) => {
    const status = self ? iconCheck : null;

    time = new Date(time).toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });

    return template({ time, self, status, ...props });
};