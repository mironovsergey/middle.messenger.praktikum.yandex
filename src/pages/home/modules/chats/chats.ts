import type { TChat } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import ChatsItem from '../chats-item';

import template from './chats.hbs';

type TChats = {
    chatList: ChatsItem[]
} & TBlockProps;

type TChatsProps = {
    chatsData: TChat[]
} & TBlockProps;

export default class Chats extends Block<TChats> {

    constructor({ chatsData, ...props }: TChatsProps) {
        super({
            ...props,
            chatList: chatsData.map((item: TChat) => new ChatsItem(item))
        });
    }

    render() {
        return this.compile(template);
    }

}
