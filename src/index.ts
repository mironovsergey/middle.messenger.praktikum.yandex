import './index.scss';

import Router from './services/router';

import Messenger from './pages/messenger';
import Profile from './pages/profile';
import EditProfile from './pages/edit-profile';
import ChangePassword from './pages/change-password';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import NotFound from './pages/not-found';

const router = Router.getInstance('#root');

router
    .use('/', SignIn, {})
    .use('/sign-up', SignUp, {})
    .use('/settings', Profile, {})
    .use('/edit-profile', EditProfile, {})
    .use('/change-password', ChangePassword, {})
    .use('/messenger', Messenger, {})
    .use('/404', NotFound, {
        title: '404',
        description: 'Not Found'
    })
    .use('/500', NotFound, {
        title: '500',
        description: 'Internal Server Error'
    })
    .start();
