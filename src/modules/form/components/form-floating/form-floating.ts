import type { TField } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import FormControl from '../form-control';
import { deepCompare } from '../../../../utils';

import template from './form-floating.hbs';

import './form-floating.scss';

type TFormFloating = {
    control: FormControl;
} & TField & TBlockProps;

export default class FormFloating extends Block<TFormFloating> {

    constructor(props: TField) {
        super({
            ...props,
            control: new FormControl(props)
        });
    }

    render() {
        return this.compile(template);
    }

    componentDidUpdate(oldProps: TFormFloating, newProps: TFormFloating) {
        return !deepCompare(oldProps.errors, newProps.errors);
    }

}
