import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import Message from '../message';

import template from './messenger-foot.hbs';

type TMessengerFoot = {
    message?: Message;
} & TBlockProps;

export default class MessengerFoot extends Block<TMessengerFoot> {

    constructor(props = {}) {
        super({
            ...props
        });
    }

    render() {
        return this.compile(template);
    }

}
