import type { TBlockProps } from '../../../../services/block';
import ChatsController from '../../../../controllers/chats-controller';
import Block from '../../../../services/block';
import FormControl from '../../../../modules/form/components/form-control';

import template from './search.hbs';

import './search.scss';

import iconSearch from '../../../../images/icons/search.svg';

type TSearch = {
    iconSearch: string;
    control: FormControl;
} & TBlockProps;

export default class Search extends Block<TSearch> {

    private inputTimer: number | null = null;

    constructor(props = {}) {
        super({
            ...props,
            iconSearch,
            control: new FormControl({
                type: 'search',
                name: 'search',
                label: 'Поиск',
                events: {
                    input: (event: Event) => {
                        const { value } = event.target as HTMLInputElement;

                        if (this.inputTimer) {
                            clearTimeout(this.inputTimer);
                        }

                        this.inputTimer = window.setTimeout(async () => {
                            ChatsController.getChats(value ? { title: value } : undefined);
                        }, 500);

                    }
                }
            })
        });
    }

    render() {
        return this.compile(template);
    }

}
