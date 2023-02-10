import type { TField } from '../../utils/types';
import type { TButton } from '../../components/button';
import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Validator from '../../services/validator';
import Button from '../../components/button';
import FormFloating from './components/form-floating';

import template from './form.hbs';

import './form.scss';

type TForm = {
    button: Block;
    fieldList: Block[];
} & TBlockProps;

type TFormProps = {
    fields: TField[];
    button: TButton;
} & TBlockProps;

export default class Form extends Block<TForm> {

    validator: Validator | null;

    constructor({ fields, button, ...props }: TFormProps) {
        super({
            ...props,
            button: new Button(button),
            fieldList: fields.map((item: TField) => new FormFloating(item))
        });
    }

    render() {
        return this.compile(template);
    }

    addEvents() {
        super.addEvents();
        this.validator = new Validator(this);
    }

    removeEvents() {
        super.removeEvents();
        this.validator?.removeEvents();
        this.validator = null;
    }

}
