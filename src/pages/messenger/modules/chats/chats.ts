import type { TChat } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import ChatsItem from '../chats-item';

import template from './chats.hbs';

type TChats = {
    chatList: ChatsItem[]
} & TBlockProps;

type TChatsProps = {
    chats: TChat[]
};

export default class Chats extends Block<TChats> {

    constructor({ chats, ...props }: TChatsProps) {
        super({
            ...props,
            chatList: chats.map((item: TChat) => new ChatsItem(item))
        });
    }

    render() {
        return this.compile(template);
    }

}
