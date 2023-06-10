import type { TMessage, TUser } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import Store from '../../../../services/store';

import template from './messages-item.hbs';

import './messages-item.scss';

import iconCheck from '../../../../images/icons/check.svg';

type TMessagesItem = {
    time: string;
    status: string;
    content: string;
    self: boolean;
    name?: string;
} & TBlockProps;

export default class MessagesItem extends Block<TMessagesItem> {

    constructor(props: TMessage) {
        const state = Store.getInstance().getState();
        const { user, users }: { user?: TUser, users?: TUser[] } = state;

        const {
            content,
            time: timeStamp,
            is_read: isRead,
            user_id: userId
        } = props;

        const currentUser = users?.find((item) => item.id === userId);
        const name = currentUser ? currentUser.display_name : 'Инкогнито';
        const status = isRead ? iconCheck : null;
        const self = userId === user?.id;

        const time = new Date(timeStamp).toLocaleTimeString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric'
        });

        super({
            ...props,
            name,
            content,
            time,
            status,
            self
        });
    }

    render() {
        return this.compile(template);
    }

}
