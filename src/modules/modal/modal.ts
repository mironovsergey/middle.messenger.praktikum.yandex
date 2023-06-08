import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';
import Backdrop from '../backdrop';

import template from './modal.hbs';

import './modal.scss';

import iconClose from 'bundle-text:../../../static/images/icons/close.svg';

type TModal = {
    title: string;
    text?: string;
    body: Block;
    iconClose: string;
    backdrop?: Backdrop;
} & TBlockProps;

type TModalProps = Omit<TModal, 'iconClose'> & TBlockProps;

export default class Modal extends Block<TModal> {

    constructor(props: TModalProps) {
        super({
            ...props,
            iconClose,
            backdrop: new Backdrop({
                events: {
                    click: props.events!.onClose
                }
            })
        });
    }

    render() {
        return this.compile(template);
    }

    addEvents() {
        this.getElement().querySelector('.modal__close')
            ?.addEventListener('click', this._props.events!.onClose);
    }

}
