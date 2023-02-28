import type { TChat as TChatData } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';

import template from './chat.hbs';

import './chat.scss';

type TChat = TChatData & TBlockProps;

export default class Chat extends Block<TChat> {

    constructor(props: TChat) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
