import type { TUser } from '../../../../utils/types';
import { API_URL } from '../../../../utils/constants';
import ProfileSettings from './profile-settings';
import ProfileImage from '../profile-image';
import { connect } from '../../../../services/store';

import nobody from '../../../../images/nobody.jpg';

const withUser = connect(({ user }: { user?: TUser }) => {
    if (!user) {
        return {};
    }

    const name = user.first_name;
    const avatar = user.avatar ? `${API_URL}/resources${user.avatar}` : nobody;

    return {
        profileName: name,
        profileImage: new ProfileImage({ avatar, name })
    };
});

export { ProfileSettings };
export default withUser(ProfileSettings);
