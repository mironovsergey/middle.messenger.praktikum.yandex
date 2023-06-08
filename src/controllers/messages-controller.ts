import type { TChat, TUser, TMessage } from '../utils/types';
import WSTransport from '../services/ws-transport';
import ChatsAPI from '../api/chats-api';
import Store from '../services/store';
import { WS_URL } from '../utils/constants';

export default class MessagesController {

    private static _instance: MessagesController;

    private ws: WSTransport | null = null;

    public static getInstance(): MessagesController {
        if (!MessagesController._instance) {
            MessagesController._instance = new MessagesController();
        }

        return MessagesController._instance;
    }

    public async initialize(): Promise<void> {
        try {
            if (this.ws?.isOpen) {
                this.ws.close();
            }

            const store = Store.getInstance().getState();
            const { chat, user }: { chat?: TChat; user?: TUser } = store;

            if (!chat) {
                throw new Error('Ошибка подключения: Чат не выбран');
            }

            if (!user) {
                throw new Error('Ошибка подключения: Пользователь не найден');
            }

            const { token } = await ChatsAPI.getToken({ id: chat.id });

            this.ws = new WSTransport(`${WS_URL}/chats/${user.id}/${chat.id}/${token}`);

            this.ws.onMessage(this.handleMessage);
        } catch (error) {
            console.error(error);
        }
    }

    private handleMessage = (message: { [key: string]: any } | Array<{ [key: string]: any }>) => {
        const store = Store.getInstance().getState();
        const { chat, messages }: { chat?: TChat; messages?: TMessage[] } = store;

        if (chat) {
            if (Array.isArray(message)) {
                Store.getInstance().set('messages', message.filter((item) => item.chat_id === chat.id));
            } else if ((message.type === 'message')) {
                Store.getInstance().set('messages', [...(messages || []), message]);
            }
        }
    };

    public sendMessage(message: string) {
        this.ws?.sendMessage(message);
    }

    public close() {
        Store.getInstance().set('messages', undefined);
        this.ws?.offMessage(this.handleMessage);
        this.ws?.close();
    }

}
