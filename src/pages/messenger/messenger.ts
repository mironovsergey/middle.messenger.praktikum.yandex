import type { TChat } from '../../utils/types';
import type { TBlockProps } from '../../services/block';
import AuthController from '../../controllers/auth-controller';
import ChatsController from '../../controllers/chats-controller';
import MessagesController from '../../controllers/messages-controller';
import Block from '../../services/block';
import MessengerSideWithChats, { MessengerSide } from './modules/messenger-side';
import MessengerHeadWithChat, { MessengerHead } from './modules/messenger-head';
import MessengerBodyWithChat, { MessengerBody } from './modules/messenger-body';
import MessengerFootWithChat, { MessengerFoot } from './modules/messenger-foot';
import Modal from '../../modules/modal';
import Form from '../../modules/form';
import Dropdown from '../../components/dropdown';
import Search from './modules/search';
import Store, { StoreEvents } from '../../services/store';
import { getFormData } from '../../utils';
import { RoutePaths } from '../../utils/constants';
import Router from '../../services/router';

import template from './messenger.hbs';

import iconBars from 'bundle-text:../../../static/images/icons/bars.svg';
import iconDots from 'bundle-text:../../../static/images/icons/dots.svg';

type TMessenger = {
    search?: Search;
    messengerSide?: MessengerSide;
    messengerHead?: MessengerHead;
    messengerBody?: MessengerBody;
    messengerFoot?: MessengerFoot;
    profileDropdown?: Dropdown;
    chatDropdown?: Dropdown;
    chatAddForm?: Block;
    userAddForm?: Block;
    userDeleteForm?: Block;
} & TBlockProps;

const chatAddForm = (onClose: () => void): Modal => {
    return new Modal({
        title: 'Создать чат',
        body: new Form({
            fields: [
                {
                    type: 'text',
                    name: 'title',
                    label: 'Наименование',
                    rules: ['required']
                }
            ],
            button: {
                type: 'submit',
                mod: 'primary',
                text: 'Создать'
            },
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();

                    const target = event.target as HTMLFormElement & {
                        isValid?: () => boolean
                    };

                    if (typeof target.isValid === 'function' && target.isValid()) {
                        const formData = getFormData(target as HTMLFormElement);

                        ChatsController.createChats(formData as { title: string; });
                        onClose();
                    }
                }
            }
        }),
        events: {
            onClose
        }
    });
};

const userAddForm = (onClose: () => void): Modal => {
    return new Modal({
        title: 'Добавить пользователя',
        body: new Form({
            fields: [
                {
                    type: 'text',
                    name: 'login',
                    label: 'Логин',
                    rules: ['required']
                }
            ],
            button: {
                type: 'submit',
                mod: 'primary',
                text: 'Добавить'
            },
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();

                    const target = event.target as HTMLFormElement & {
                        isValid?: () => boolean
                    };

                    if (typeof target.isValid === 'function' && target.isValid()) {
                        const formData = getFormData(target as HTMLFormElement);

                        ChatsController.addUsers(formData as { login: string; });
                        onClose();
                    }
                }
            }
        }),
        events: {
            onClose
        }
    });
};

const userDeleteForm = (onClose: () => void): Modal => {
    return new Modal({
        title: 'Удалить пользователя',
        body: new Form({
            fields: [
                {
                    type: 'text',
                    name: 'login',
                    label: 'Логин',
                    rules: ['required']
                }
            ],
            button: {
                type: 'submit',
                mod: 'primary',
                text: 'Удалить'
            },
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();

                    const target = event.target as HTMLFormElement & {
                        isValid?: () => boolean
                    };

                    if (typeof target.isValid === 'function' && target.isValid()) {
                        const formData = getFormData(target as HTMLFormElement);

                        ChatsController.deleteUsers(formData as { login: string; });
                        onClose();
                    }
                }
            }
        }),
        events: {
            onClose
        }
    });
};

export default class Messenger extends Block<TMessenger> {

    private currentChat: TChat | null = null;

    constructor(props = {}) {
        super({
            ...props,
            search: new Search(),
            messengerSide: new MessengerSideWithChats({}),
            messengerHead: new MessengerHeadWithChat({
                chatDropdown: new Dropdown({
                    icon: iconDots,
                    right: true,
                    items: [
                        {
                            icon: '/images/icons/plus.svg',
                            text: 'Добавить пользователя',
                            events: {
                                click: (event: Event) => {
                                    event.preventDefault();
                                    event.stopPropagation();

                                    this.setProps({
                                        userAddForm: userAddForm(() => {
                                            this.setProps({
                                                userAddForm: undefined
                                            });
                                        })
                                    });
                                }
                            }
                        },
                        {
                            icon: '/images/icons/xmark.svg',
                            text: 'Удалить пользователя',
                            events: {
                                click: (event: Event) => {
                                    event.preventDefault();
                                    event.stopPropagation();

                                    this.setProps({
                                        userDeleteForm: userDeleteForm(() => {
                                            this.setProps({
                                                userDeleteForm: undefined
                                            });
                                        })
                                    });
                                }
                            }
                        }
                    ]
                })
            }),
            messengerBody: new MessengerBodyWithChat({}),
            messengerFoot: new MessengerFootWithChat({}),
            profileDropdown: new Dropdown({
                icon: iconBars,
                items: [
                    {
                        icon: '/images/icons/user.svg',
                        text: 'Профиль',
                        events: {
                            click: (event: SubmitEvent) => {
                                event.preventDefault();
                                event.stopPropagation();

                                Router.getInstance().go(RoutePaths.Profile);
                            }
                        }
                    },
                    {
                        icon: '/images/icons/exit.svg',
                        text: 'Выйти',
                        events: {
                            click: (event: SubmitEvent) => {
                                event.preventDefault();
                                event.stopPropagation();

                                AuthController.logout();
                            }
                        }
                    }
                ]
            }),
            chatDropdown: new Dropdown({
                icon: iconDots,
                right: true,
                items: [
                    {
                        icon: '/images/icons/plus.svg',
                        text: 'Создать чат',
                        events: {
                            click: (event: Event) => {
                                event.preventDefault();
                                event.stopPropagation();

                                this.setProps({
                                    chatAddForm: chatAddForm(() => {
                                        this.setProps({
                                            chatAddForm: undefined
                                        });
                                    })
                                });
                            }
                        }
                    }
                ]
            })
        });
    }

    render() {
        return this.compile(template);
    }

    componentDidMount() {
        ChatsController.getChats();
        Store.getInstance().set('chat', undefined);
        Store.getInstance().set('users', undefined);

        Store.getInstance().on(StoreEvents.Updated, () => {
            const store = Store.getInstance().getState();
            const { chat }: { chat?: TChat; } = store;

            if (chat) {
                if (this.currentChat && this.currentChat.id === chat.id) {
                    return;
                }

                this.currentChat = chat;
                MessagesController.getInstance().initialize();
            }
        });
    }

}
