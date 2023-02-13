import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';

import template from './dropdown.hbs';

import './dropdown.scss';

type TDropdownItems = {
    icon?: string;
    text: string;
};

type TDropdown = {
    icon: string;
    active?: boolean;
    top?: boolean;
    right?: boolean;
    items: TDropdownItems[];
} & TBlockProps;

export default class Dropdown extends Block<TDropdown> {

    constructor(props: TDropdown) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
