import profileDataItem from '../profile-data-item';

import template from './profile-data.hbs';

import './profile-data.scss';

export default (userData) => {
    const userDataList = userData.map((item) => profileDataItem(item));

    return template({ userDataList });
};
