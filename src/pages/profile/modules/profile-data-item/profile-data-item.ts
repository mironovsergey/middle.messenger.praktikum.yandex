import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';

import template from './profile-data-item.hbs';

import './profile-data-item.scss';

type TProfileDataItem = {
    title: string;
    value: string;
} & TBlockProps;

export default class ProfileDataItem extends Block<TProfileDataItem> {

    constructor(props: TProfileDataItem) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
