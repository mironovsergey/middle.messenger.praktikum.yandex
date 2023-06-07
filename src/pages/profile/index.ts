import type { TUser } from '../../utils/types';
import Profile from './profile';
import ProfileSettingsWithUser from './modules/profile-settings';
import ProfileDataWithUser from './modules/profile-data';
import { requireAuth } from '../../services/auth';
import { connect } from '../../services/store';

const withUser = connect(({ user }: { user?: TUser }) => {
    if (!user) {
        return {};
    }

    return {
        profileSettings: new ProfileSettingsWithUser({}),
        profileData: new ProfileDataWithUser({})
    };
});

export default withUser(requireAuth(Profile));
