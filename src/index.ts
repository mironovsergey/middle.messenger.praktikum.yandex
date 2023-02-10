import './index.scss';

import {
    user as userData,
    chats as chatsData,
    messages as messagesData
} from './utils/data';

import Block from './services/block';
import Home from './pages/home';
import Profile from './pages/profile';
import EditProfile from './pages/edit-profile';
import ChangePassword from './pages/change-password';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import NotFound from './pages/not-found';

const routes: Record<string, Function> = {};
const templates: Record<string, Function> = {};

const route = (path: string, template: string | (() => void)): void => {
    if (typeof template === 'function') {
        routes[path] = template;
    } else if (typeof template === 'string') {
        routes[path] = templates[template];
    }
};

const resolveRoute = (route: string) => {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Роут ${route} не найден`);
    }
};

const router = () => {
    const match = window.location.hash.match(/#(.*)$/);
    const url = match ? `/${match[1]}` : '/';
    const route = resolveRoute(url);

    route();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

const template = (name: string, templateFunction: { (): void; (): void; }) => {
    return templates[name] = templateFunction;
};

const renderDOM = (selector: string, block: Block) => {
    const root: HTMLElement | null = document.querySelector(selector);

    if (!root) {
        return;
    }

    root.replaceChildren(block.getElement());

    block.dispatchComponentDidMount();

    return root;
};

template('home', () => {
    renderDOM('#root', new Home({ chatsData, messagesData }));
});

template('profile', () => {
    renderDOM('#root', new Profile({ userData }));
});

template('edit-profile', () => {
    renderDOM('#root', new EditProfile());
});

template('change-password', () => {
    renderDOM('#root', new ChangePassword());
});

template('sign-in', () => {
    renderDOM('#root', new SignIn());
});

template('sign-up', () => {
    renderDOM('#root', new SignUp());
});

template('404', () => {
    renderDOM('#root', new NotFound({
        title: '404',
        description: 'Not Found'
    }));
});

template('500', () => {
    renderDOM('#root', new NotFound({
        title: '500',
        description: 'Internal Server Error'
    }));
});

route('/', 'home');
route('/profile', 'profile');
route('/edit-profile', 'edit-profile');
route('/change-password', 'change-password');
route('/sign-in', 'sign-in');
route('/sign-up', 'sign-up');
route('/404', '404');
route('/500', '500');
