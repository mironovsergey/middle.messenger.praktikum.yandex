import type {
    TSignUpRequest,
    TSignUpResponse,
    TSignInRequest,
    TUser
} from '../utils/types';
import { API_URL } from '../utils/constants';
import HTTPTransport from '../services/http-transport';

export default class AuthAPI {

    // Регистрация
    public static async signup(data: TSignUpRequest): Promise<TSignUpResponse> {
        try {
            const response = await HTTPTransport.post(`${API_URL}/auth/signup`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await HTTPTransport.checkResponse<TSignUpResponse>(response);
        } catch (error) {
            throw new Error(`Ошибка регистрации: ${error.message}`);
        }
    }

    // Авторизация
    public static async signin(data: TSignInRequest) {
        try {
            return await HTTPTransport.post(`${API_URL}/auth/signin`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            throw new Error(`Ошибка авторизации: ${error.message}`);
        }
    }

    // Получение подробной информации по текущему пользователю
    public static async user(): Promise<TUser> {
        try {
            const response = await HTTPTransport.get(`${API_URL}/auth/user`);

            return await HTTPTransport.checkResponse<TUser>(response);
        } catch (error) {
            throw new Error(`Ошибка получения информации о пользователе: ${error.message}`);
        }
    }

    // Выход из системы
    public static async logout() {
        try {
            return await HTTPTransport.post(`${API_URL}/auth/logout`);
        } catch (error) {
            throw new Error(`Ошибка выхода из системы: ${error.message}`);
        }
    }

}
