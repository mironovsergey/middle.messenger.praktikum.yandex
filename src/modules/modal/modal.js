import template from './modal.hbs';

import './modal.scss';

import iconClose from 'bundle-text:../../../static/images/icons/close.svg';

export default (props = {}) => {
    return template({ iconClose, ...props });
};