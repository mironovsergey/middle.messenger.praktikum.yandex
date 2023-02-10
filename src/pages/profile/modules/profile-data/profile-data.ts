import type { TUser } from '../../../../utils/types';
import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import ProfileDataItem from '../profile-data-item';

import template from './profile-data.hbs';

import './profile-data.scss';

type TProfileData = {
    userDataList: ProfileDataItem[];
} & TBlockProps;

type TProfileDataProps = {
    userData: TUser;
} & TBlockProps;

export default class ProfileData extends Block<TProfileData> {

    constructor({ userData, ...props }: TProfileDataProps) {
        const data = [
            { title: 'Имя в чате', value: userData.display_name },
            { title: 'Логин', value: userData.login },
            { title: 'Имя', value: userData.first_name },
            { title: 'Фамилия', value: userData.second_name },
            { title: 'Почта', value: userData.email },
            { title: 'Телефон', value: userData.phone }
        ];

        super({
            ...props,
            userDataList: data.map((item) => new ProfileDataItem(item))
        });
    }

    render() {
        return this.compile(template);
    }

}
