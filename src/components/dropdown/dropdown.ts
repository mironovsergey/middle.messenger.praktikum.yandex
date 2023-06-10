import type { TBlockProps } from '../../services/block';
import type { TDropdownItem } from './dropdown-item';
import Block from '../../services/block';
import DropdownItem from './dropdown-item';

import template from './dropdown.hbs';

import './dropdown.scss';

type TDropdown = {
    icon: string;
    active?: boolean;
    top?: boolean;
    right?: boolean;
    items: DropdownItem[];
} & TBlockProps;

export default class Dropdown extends Block<TDropdown> {

    constructor({ items, ...props }: { items: TDropdownItem[] } & Omit<TDropdown, 'items'>) {
        super({
            ...props,
            items: items.map((item: TDropdownItem) => new DropdownItem(item)),
            events: {
                click: () => {
                    const { active } = this._props;

                    this.setProps({
                        active: !active
                    });

                    if (!active) {
                        document.addEventListener('click', this.handleDocumentClick, true);
                    } else {
                        document.removeEventListener('click', this.handleDocumentClick, true);
                    }
                }
            }
        });
    }

    render() {
        return this.compile(template);
    }

    addEvents() {
        const button = this.getButtonElement();

        if (button instanceof HTMLElement) {
            button.addEventListener('click', this._props.events!.click);
        }
    }

    removeEvents() {
        const button = this.getButtonElement();

        if (button instanceof HTMLElement) {
            button.removeEventListener('click', this._props.events!.click);
        }
    }

    getButtonElement(): HTMLElement | null {
        const element = this.getElement();

        if (element instanceof HTMLElement) {
            return element.querySelector('.dropdown__toggle');
        }

        return null;
    }

    handleDocumentClick = () => {
        if (this._props.active) {
            this.setProps({
                active: false
            });

            document.removeEventListener('click', this.handleDocumentClick, true);
        }
    };

}
