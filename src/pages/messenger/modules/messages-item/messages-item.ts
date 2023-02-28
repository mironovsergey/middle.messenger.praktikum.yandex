import type { TMessage } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';

import template from './messages-item.hbs';

import './messages-item.scss';

import iconCheck from 'bundle-text:../../../../../static/images/icons/check.svg';

type TMessagesItem = {
    time: string;
    status: string | null;
    imageName: string | null;
} & Omit<TMessage, 'time'> & TBlockProps;

export default class MessagesItem extends Block<TMessagesItem> {

    constructor(props: TMessage) {
        const { time: timestamp, self, image } = props;
        const status = self ? iconCheck : null;
        const imageName = image ? image.replace(/^.*[\\\/]/, '') : null;
        const time = new Date(timestamp).toLocaleTimeString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric'
        });

        super({
            ...props,
            time,
            status,
            imageName
        });
    }

    render() {
        return this.compile(template);
    }

}
