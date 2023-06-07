import type { TSignUpRequest, TSignInRequest } from '../utils/types';
import AuthAPI from '../api/auth-api';
import Store from '../services/store';
import Router from '../services/router';
import { RoutePaths } from '../utils/constants';

export default class AuthController {

    // Регистрация и редирект в мессенджер
    public static async signup(data: TSignUpRequest) {
        try {
            await AuthAPI.signup(data);
            await AuthController.user();
            Router.getInstance().go(RoutePaths.Messenger);
        } catch (error) {
            alert(error.message);
        }
    }

    // Авторизация и редирект в мессенджер
    public static async signin(data: TSignInRequest) {
        try {
            await AuthAPI.signin(data);
            await AuthController.user();
            Router.getInstance().go(RoutePaths.Messenger);
        } catch (error) {
            alert(error.message);
        }
    }

    // Получение подробной информации по текущему пользователю
    public static async user() {
        try {
            const response = await AuthAPI.user();
            Store.getInstance().set('user', response);
        } catch (error) {
            alert(error.message);
        }
    }

    // Выход из системы и редирект на страницу авторизации
    public static async logout() {
        try {
            await AuthAPI.logout();
            Store.getInstance().set('user', undefined);
            Router.getInstance().go(RoutePaths.SignIn);
        } catch (error) {
            alert(error.message);
        }
    }

}
