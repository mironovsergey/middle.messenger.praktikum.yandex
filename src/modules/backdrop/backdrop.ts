import type { TBlockProps } from '../../services/block';
import Block from '../../services/block';

import template from './backdrop.hbs';

import './backdrop.scss';

type TBackdrop = TBlockProps;

export default class Backdrop extends Block<TBackdrop> {

    constructor(props = {}) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
