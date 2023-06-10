import type { TChat } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import { API_URL } from '../../../../utils/constants';
import Block from '../../../../services/block';

import template from './chat.hbs';

import './chat.scss';

import noimage from '../../../../images/noimage.jpg';

export default class Chat extends Block<TChat & TBlockProps> {

    constructor({ avatar, ...props }: TChat) {
        avatar = avatar ? `${API_URL}/resources${avatar}` : noimage;

        super({
            ...props,
            avatar
        });
    }

    render() {
        return this.compile(template);
    }

}
