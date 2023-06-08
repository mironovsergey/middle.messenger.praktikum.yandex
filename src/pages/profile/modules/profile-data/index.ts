import type { TUser } from '../../../../utils/types';
import ProfileData from './profile-data';
import ProfileDataItem from '../profile-data-item';
import { connect } from '../../../../services/store';

const withUser = connect(({ user }: { user?: TUser }) => {
    if (!user) {
        return {};
    }

    const data = [
        { title: 'Имя в чате', value: user.display_name },
        { title: 'Логин', value: user.login },
        { title: 'Имя', value: user.first_name },
        { title: 'Фамилия', value: user.second_name },
        { title: 'Почта', value: user.email },
        { title: 'Телефон', value: user.phone }
    ];

    return {
        userDataList: data.map((item) => new ProfileDataItem(item))
    };
});

export { ProfileData };
export default withUser(ProfileData);
