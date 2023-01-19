import template from './profile-data-item.hbs';

import './profile-data-item.scss';

import iconRight from 'bundle-text:../../../../../static/images/icons/right.svg';

export default (props = {}) => {
    return template({ iconRight, ...props });
};