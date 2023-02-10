import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';

import template from './profile-image.hbs';

import './profile-image.scss';

type TProfileImage = {
    avatar: string;
    name: string;
} & TBlockProps;

export default class ProfileImage extends Block<TProfileImage> {

    constructor(props: TProfileImage) {
        super(props);
    }

    render() {
        return this.compile(template);
    }

}
