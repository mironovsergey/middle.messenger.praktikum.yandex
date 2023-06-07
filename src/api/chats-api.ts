import type {
    TGetChatsRequest,
    TPostChatsResponse,
    TDeleteChatsResponse,
    TPutUsersRequest,
    TDeleteUsersRequest,
    TGetUsersRequest,
    TGetTokenResponse,
    TUser,
    TChat
} from '../utils/types';
import { API_URL } from '../utils/constants';
import HTTPTransport from '../services/http-transport';

export default class ChatsAPI {

    // Получение чатов текущего пользователя
    public static async getChats(data: TGetChatsRequest = {}): Promise<Array<TChat>> {
        try {
            const response = await HTTPTransport.get(`${API_URL}/chats`, {
                data
            });

            return await HTTPTransport.checkResponse<Array<TChat>>(response);
        } catch (error) {
            throw new Error(`Ошибка получения чатов: ${error.message}`);
        }
    }

    // Создание чата
    public static async postChats(data: { title: string; }): Promise<TPostChatsResponse> {
        try {
            const response = await HTTPTransport.post(`${API_URL}/chats`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await HTTPTransport.checkResponse<TPostChatsResponse>(response);
        } catch (error) {
            throw new Error(`Ошибка создания чата: ${error.message}`);
        }
    }

    // Удаление чата
    public static async deleteChats(data: { chatId: number; }): Promise<TDeleteChatsResponse> {
        try {
            const response = await HTTPTransport.delete(`${API_URL}/chats`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await HTTPTransport.checkResponse<TDeleteChatsResponse>(response);
        } catch (error) {
            throw new Error(`Ошибка удаления чата: ${error.message}`);
        }
    }

    // Добавление пользователя в чат
    public static async putUsers(data: TPutUsersRequest) {
        try {
            const response = await HTTPTransport.put(`${API_URL}/chats/users`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200 || response.responseText !== 'OK') {
                throw new Error('Некорректный ответ сервера');
            }

            return 'Пользователь успешно добавлен';
        } catch (error) {
            throw new Error(`Ошибка добавления пользователя: ${error.message}`);
        }
    }

    // Удаление пользователя из чата
    public static async deleteUsers(data: TDeleteUsersRequest) {
        try {
            const response = await HTTPTransport.delete(`${API_URL}/chats/users`, {
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200 || response.responseText !== 'OK') {
                throw new Error('Некорректный ответ сервера');
            }

            return 'Пользователь успешно удален';
        } catch (error) {
            throw new Error(`Ошибка удаления пользователя: ${error.message}`);
        }
    }

    // Получение пользователей чата
    public static async getUsers(data: TGetUsersRequest): Promise<Array<TUser>> {
        try {
            const response = await HTTPTransport.get(`${API_URL}/chats/${data.id}/users`, {
                data
            });

            return await HTTPTransport.checkResponse<Array<TUser>>(response);
        } catch (error) {
            throw new Error(`Ошибка получения пользователей чата: ${error.message}`);
        }
    }

    // Получение токена для подключения к серверу
    public static async getToken(data: { id: number }) {
        try {
            const { id } = data;

            const response = await HTTPTransport.post(`${API_URL}/chats/token/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await HTTPTransport.checkResponse<TGetTokenResponse>(response);
        } catch (error) {
            throw new Error(`Ошибка получения токена: ${error.message}`);
        }
    }

}
