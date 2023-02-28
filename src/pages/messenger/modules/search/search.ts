import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import FormControl from '../../../../modules/form/components/form-control';
import { getFormData } from '../../../../utils';

import template from './search.hbs';

import './search.scss';

import iconSearch from 'bundle-text:../../../../../static/images/icons/search.svg';

type TSearch = {
    iconSearch: string;
    control: FormControl;
} & TBlockProps;

export default class Search extends Block<TSearch> {

    constructor(props = {}) {
        super({
            ...props,
            iconSearch,
            control: new FormControl({
                type: 'search',
                name: 'search',
                label: 'Поиск'
            }),
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();
                    event.stopPropagation();

                    console.log(getFormData(event.target as HTMLFormElement));
                }
            }
        });
    }

    render() {
        return this.compile(template);
    }

}
