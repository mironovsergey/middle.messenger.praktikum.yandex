import Block from '../services/block';
import Router from '../services/router';
import AuthAPI from '../api/auth-api';
import Store from './store';
import { RoutePaths } from '../utils/constants';

export const checkAuth = async () => {
    try {
        const response = await AuthAPI.user();
        Store.getInstance().set('user', response);
        return true;
    } catch (error) {
        return false;
    }
};

export const requireAuth = (Component: typeof Block<any>) => {
    return class extends Component {
        componentDidMount() {
            this.checkAuth();
            super.componentDidMount();
        }

        async checkAuth() {
            const isAuth = await checkAuth();

            if (!isAuth) {
                Router.getInstance().go(RoutePaths.SignIn);
            }
        }
    };
};
