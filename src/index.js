import './index.scss';

import {
    user,
    chats as chatsArray,
    messages as messagesArray
} from './utils/data';

import home from './pages/home';
import profile from './pages/profile';
import editProfile from './pages/edit-profile';
import changePassword from './pages/change-password';
import signIn from './pages/sign-in';
import signUp from './pages/sign-up';
import error from './pages/error';

const root = document.getElementById('root');

const routes = {};
const templates = {};

const route = (path, template) => {
    if (typeof template === 'function') {
        return routes[path] = template;
    } else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};

const resolveRoute = (route) => {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Роут ${route} не найден`);
    };
};

const router = () => {
    const match = window.location.hash.match(/#(.*)$/);
    const url = match ? '/' + match[1] : '/';
    const route = resolveRoute(url);

    route();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

const template = (name, templateFunction) => {
    return templates[name] = templateFunction;
};

template('home', () => {
    root.innerHTML = home({ chatsArray, messagesArray });
});

template('profile', () => {
    root.innerHTML = profile({ user });
});

template('edit-profile', () => {
    root.innerHTML = editProfile({ user });
});

template('change-password', () => {
    root.innerHTML = changePassword();
});

template('sign-in', () => {
    root.innerHTML = signIn();
});

template('sign-up', () => {
    root.innerHTML = signUp();
});

template('404', () => {
    root.innerHTML = error({
        title: '404',
        description: 'Not Found'
    });
});

template('500', () => {
    root.innerHTML = error({
        title: '500',
        description: 'Internal Server Error'
    });
});

route('/', 'home');
route('/profile', 'profile');
route('/edit-profile', 'edit-profile');
route('/change-password', 'change-password');
route('/sign-in', 'sign-in');
route('/sign-up', 'sign-up');
route('/404', '404');
route('/500', '500');
