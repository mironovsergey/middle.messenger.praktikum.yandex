import './index.scss';

import Router from './services/router';
import { RoutePaths } from './utils/constants';

import Messenger from './pages/messenger';
import Profile from './pages/profile';
import EditProfile from './pages/edit-profile';
import ChangePassword from './pages/change-password';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import NotFound from './pages/not-found';

const router = Router.getInstance('#root');

router
    .use(RoutePaths.SignIn, SignIn, {})
    .use(RoutePaths.SignUp, SignUp, {})
    .use(RoutePaths.Profile, Profile, {})
    .use(RoutePaths.EditProfile, EditProfile, {})
    .use(RoutePaths.ChangePassword, ChangePassword, {})
    .use(RoutePaths.Messenger, Messenger, {})
    .use(RoutePaths.Error404, NotFound, {
        title: '404',
        description: 'Not Found'
    }, true)
    .start();
