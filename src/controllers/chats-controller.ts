import type { TGetChatsRequest, TGetUsersRequest, TChat } from '../utils/types';
import ChatsAPI from '../api/chats-api';
import UserAPI from '../api/user-api';
import Store from '../services/store';

export default class ChatsController {

    // Получение чатов текущего пользователя
    public static async getChats(data: TGetChatsRequest = {}) {
        try {
            const response = await ChatsAPI.getChats(data);
            Store.getInstance().set('chats', response);
        } catch (error) {
            alert(error.message);
        }
    }

    // Создание чата
    public static async createChats(data: { title: string; }) {
        try {
            await ChatsAPI.postChats(data);
            await ChatsController.getChats();
        } catch (error) {
            alert(error.message);
        }
    }

    // Удаление чата
    public static async deleteChats(data: { chatId: number; }) {
        try {
            const state = Store.getInstance().getState();
            const { chat }: { chat?: TChat } = state;

            await ChatsAPI.deleteChats(data);
            await ChatsController.getChats();

            if (chat && chat.id === data.chatId) {
                Store.getInstance().set('chat', undefined);
                Store.getInstance().set('users', undefined);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    // Добавление пользователя в чат
    public static async addUsers(data: { login: string; }) {
        try {
            const state = Store.getInstance().getState();
            const { chat }: { chat?: TChat } = state;

            if (!chat) {
                throw new Error('Ошибка добавления пользователя: Чат не выбран');
            }

            const users = await UserAPI.search(data);
            const user = users.find((item) => item.login === data.login);

            if (typeof user === 'undefined') {
                throw new Error('Ошибка добавления пользователя: Пользователь не найден');
            }

            const response = await ChatsAPI.putUsers({
                users: [user.id],
                chatId: chat.id
            });

            await ChatsController.getChats();

            alert(response);
        } catch (error) {
            alert(error.message);
        }
    }

    // Удаление пользователя из чата
    public static async deleteUsers(data: { login: string; }) {
        try {
            const state = Store.getInstance().getState();
            const { chat }: { chat?: TChat } = state;

            if (!chat) {
                throw new Error('Ошибка удаления пользователя: Чат не выбран');
            }

            const users = await UserAPI.search(data);
            const user = users.find((item) => item.login === data.login);

            if (typeof user === 'undefined') {
                throw new Error('Ошибка удаления пользователя: Пользователь не найден');
            }

            const response = await ChatsAPI.deleteUsers({
                users: [user.id],
                chatId: chat.id
            });

            await ChatsController.getChats();

            alert(response);
        } catch (error) {
            alert(error.message);
        }
    }

    // Получение пользователей чата
    public static async getUsers(data: TGetUsersRequest) {
        try {
            const response = await ChatsAPI.getUsers(data);
            Store.getInstance().set('users', response);
        } catch (error) {
            alert(error.message);
        }
    }

}
