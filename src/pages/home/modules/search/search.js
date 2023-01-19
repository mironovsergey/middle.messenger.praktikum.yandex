import formControl from '../../../../modules/form/components/form-control';

import template from './search.hbs';

import './search.scss';

import iconSearch from 'bundle-text:../../../../../static/images/icons/search.svg';

export default (props = {}) => {
    return template({
        iconSearch,
        control: formControl({
            type: 'search',
            name: 'search',
            label: 'Поиск'
        }),
        ...props
    });
};