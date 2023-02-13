import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';

import template from './modal.hbs';

import './modal.scss';

import iconClose from 'bundle-text:../../../static/images/icons/close.svg';

type TModal = {
    title: string;
    text: string;
    body: Block;
    iconClose: string;
} & TBlockProps;

type TModalProps = Omit<TModal, 'iconClose'> & TBlockProps;

export default class Modal extends Block<TModal> {

    constructor(props: TModalProps) {
        super({ ...props, iconClose });
    }

    render() {
        return this.compile(template);
    }

}
