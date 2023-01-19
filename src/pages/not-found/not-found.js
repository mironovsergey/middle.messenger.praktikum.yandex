import template from './not-found.hbs';

import './not-found.scss';

const title = '404';
const description = 'Not Found';

export default (props = {}) => {
    return template({
        title,
        description,
        ...props
    });
};