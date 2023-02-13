import type { TBlockProps } from '../../services/block';

import Block from '../../services/block';

import template from './not-found.hbs';

import './not-found.scss';

type TNotFoundProps = {
    title: string;
    description: string;
} & TBlockProps;

export default class NotFound extends Block<TNotFoundProps> {

    constructor(props: TNotFoundProps) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
