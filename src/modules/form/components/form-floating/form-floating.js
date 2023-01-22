import formControl from '../form-control';

import template from './form-floating.hbs';

import './form-floating.scss';

export default (props = {}) => {
    return template({ control: formControl(props), ...props });
};
