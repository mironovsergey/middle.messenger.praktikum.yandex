import type { TField } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';

import template from './form-control.hbs';

import './form-control.scss';

type TFormControl = TField & TBlockProps;

export default class FormControl extends Block<TFormControl> {

    constructor(props: TFormControl) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
