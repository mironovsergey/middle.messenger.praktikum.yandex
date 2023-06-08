import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';

import template from './dropdown-item.hbs';

export type TDropdownItem = {
    icon?: string;
    text: string;
} & TBlockProps;

export default class DropdownItem extends Block<TDropdownItem> {

    constructor(props: TDropdownItem) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
