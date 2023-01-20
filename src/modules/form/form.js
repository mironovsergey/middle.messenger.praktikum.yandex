import formFloating from './components/form-floating';

import template from './form.hbs';

import './form.scss';

export default ({ fields, button }) => {
    const fieldList = fields.map((item) => formFloating(item));

    return template({ fieldList, button });
};
