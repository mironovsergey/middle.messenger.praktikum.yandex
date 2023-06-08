import type { TChat } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import Dropdown from '../../../../components/dropdown';
import Store, { StoreEvents } from '../../../../services/store';
import Chat from '../chat';

import template from './messenger-head.hbs';

type TMessengerHead = {
    chat?: Chat;
    chatDropdown?: Dropdown;
} & TBlockProps;

export default class MessengerHead extends Block<TMessengerHead> {

    private chatDropdown?: Dropdown;

    constructor({ chatDropdown, ...props }: { chatDropdown?: Dropdown; }) {
        super({
            ...props
        });

        this.chatDropdown = chatDropdown;
    }

    render() {
        return this.compile(template);
    }

    componentDidMount() {
        Store.getInstance().on(StoreEvents.Updated, () => {
            const store = Store.getInstance().getState();
            const { chat }: { chat?: TChat; } = store;

            this.setProps({ chatDropdown: chat ? this.chatDropdown : undefined });
        });
    }

}
