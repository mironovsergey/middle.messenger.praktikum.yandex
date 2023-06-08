import type { TUser, TProfileRequest, TPasswordRequest } from '../utils/types';
import { API_URL } from '../utils/constants';
import HTTPTransport from '../services/http-transport';

export default class UserAPI {

    // Изменение данных текущего пользователя
    public static async profile(data: TProfileRequest): Promise<TUser> {
        try {
            const response = await HTTPTransport.put(`${API_URL}/user/profile`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await HTTPTransport.checkResponse<TUser>(response);
        } catch (error) {
            throw new Error(`Ошибка изменения данных: ${error.message}`);
        }
    }

    // Изменение пароля текущего пользователя
    public static async password(data: TPasswordRequest) {
        try {
            const response = await HTTPTransport.put(`${API_URL}/user/password`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200 || response.responseText !== 'OK') {
                throw new Error('Некорректный ответ сервера');
            }

            return 'Пароль успешно изменен';
        } catch (error) {
            throw new Error(`Ошибка изменения пароля: ${error.message}`);
        }
    }

    // Обновление аватара текущего пользователя
    public static async avatar(data: FormData) {
        try {
            const response = await HTTPTransport.put(`${API_URL}/user/profile/avatar`, {
                data
            });

            return await HTTPTransport.checkResponse<TUser>(response);
        } catch (error) {
            throw new Error(`Ошибка обновления аватара: ${error.message}`);
        }
    }

    // Поиск пользователей по логину
    public static async search(data: { login: string; }): Promise<Array<TUser>> {
        try {
            const response = await HTTPTransport.post(`${API_URL}/user/search`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await HTTPTransport.checkResponse<TUser[]>(response);
        } catch (error) {
            throw new Error(`Ошибка поиска пользователей: ${error.message}`);
        }
    }

}
