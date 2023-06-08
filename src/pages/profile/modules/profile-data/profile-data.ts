import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import ProfileDataItem from '../profile-data-item';

import template from './profile-data.hbs';

import './profile-data.scss';

type TProfileData = {
    userDataList?: ProfileDataItem[];
} & TBlockProps;

export default class ProfileData extends Block<TProfileData> {

    constructor(props = {}) {
        super({ ...props });
    }

    render() {
        return this.compile(template);
    }

}
