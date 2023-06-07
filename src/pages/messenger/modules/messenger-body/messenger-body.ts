import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import { Messages } from '../messages';

import template from './messenger-body.hbs';

type TMessengerBody = {
    messages?: Messages;
} & TBlockProps;

export default class MessengerBody extends Block<TMessengerBody> {

    constructor(props = {}) {
        super({
            ...props
        });
    }

    render() {
        return this.compile(template);
    }

}
