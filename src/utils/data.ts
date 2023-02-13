import type { TChat, TMessage, TUser } from './types';

export const chats: TChat[] = [
    {
        name: 'Андрей',
        image: '/images/nobody.jpg',
        time: 1673881200000,
        text: 'Изображение',
        count: '121'
    },
    {
        name: 'Киноклуб',
        image: '/images/nobody.jpg',
        time: 1673874000000,
        text: '<span>Вы:</span> Изображение',
        count: ''
    },
    {
        name: 'Илья',
        image: '/images/nobody.jpg',
        time: 1673866800000,
        text: 'Друзья, у меня для вас особенный выпуск новостей!...',
        count: '9'
    },
    {
        name: 'Вадим',
        image: '/images/nobody.jpg',
        time: 1673780400000,
        text: 'Вы: Круто!',
        count: '1',
        active: true
    },
    {
        name: 'тет-а-теты',
        image: '/images/nobody.jpg',
        time: 1673766000000,
        text: 'Human Interface Guidelines и Material Design рекомендуют...',
        count: ''
    },
    {
        name: '1, 2, 3',
        image: '/images/nobody.jpg',
        time: 1651734000000,
        text: 'Миллионы россиян ежедневно проводят десятки часов свое...',
        count: ''
    },
    {
        name: 'Day',
        image: '/images/nobody.jpg',
        time: 1651647600000,
        text: 'Так увлёкся работой по курсу, что совсем забыл...',
        count: ''
    },
    {
        name: 'Стас Рогозин',
        image: '/images/nobody.jpg',
        time: 1651388400000,
        text: 'Друзья, у меня для вас особенный выпуск новостей!...',
        count: ''
    }
];

export const messages: TMessage[] = [
    {
        text: 'Привет!',
        time: 1673809200000
    },
    {
        image: '/images/shuttle.png',
        time: 1673812800000
    },
    {
        text: 'Круто!',
        time: 1673859600000,
        self: true
    }
];

export const user: TUser = {
    avatar: '/images/noimage.jpg',
    display_name: 'Иван',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    email: 'pochta@yandex.ru',
    phone: '+7 (900) 000 00-00'
};
