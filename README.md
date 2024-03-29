# Messenger

[![Tests](https://github.com/mironovsergey/middle.messenger.praktikum.yandex/actions/workflows/tests.yml/badge.svg)](https://github.com/mironovsergey/middle.messenger.praktikum.yandex/actions/workflows/tests.yml)

Мессенджер - это современное приложение чата, разработанное для обмена
сообщениями и создания групповых чатов. Он предоставляет удобный интерфейс для
взаимодействия пользователей, обеспечивая быструю и надежную коммуникацию.

[Демо-версия проекта](https://lambent-hotteok-03f506.netlify.app/)

## Особенности

- **Авторизация и регистрация:** Пользователи могут создать учетную запись
в системе или войти с помощью своих учетных данных. Авторизованные пользователи
получают доступ ко всем функциям приложения.

- **Профиль пользователя:** Пользователи имеют персональный профиль, где они
могут просматривать и редактировать свои данные. Они могут загрузить аватар,
изменить свое имя, адрес электронной почты и другую информацию.

- **Страница чата**  Главная страница приложения представляет собой чат, где
пользователи могут обмениваться сообщениями в режиме реального времени. Они
могут видеть историю сообщений и отправлять новые сообщения. Пользователи могут
создавать групповые чаты, приглашать других пользователей и обмениваться
сообщениями в рамках этих чатов.

## Установка и запуск проекта

Установка зависимостей

    npm install

Запуск в режиме разработки

    npm run serve

Сборка проекта для продакшена

    npm run build

Запуск сервера

    npm run start

Запуск тестов

    npm run test

Сборка образа Docker

    docker build -t middle-messenger-praktikum-yandex .

Запуск контейнера Docker

    docker run -p 3000:3000 middle-messenger-praktikum-yandex

Получение списка запущенных контейнеров Docker

    docker ps

Остановка контейнера Docker

    docker stop <CONTAINER ID>

## Дизайн-макет

[Макет в Figma](https://www.figma.com/file/rcpZBVPmaAXBgzTcSlguc1/social-network-chat?node-id=0%3A1&t=dt38BE58h3eGzOOG-1)

## Используемые технологии

- **Язык программирования:** TypeScript
- **Верстка:** HTML, SCSS
- **Шаблонизация:** Handlebars
- **Сборка проекта:** Webpack
- **Линтинг:** ESLint
- **Линтинг стилей:** stylelint
- **Тестирование:** Mocha, Chai
- **Контейнеризация:** Docker
- **Git-хуки:** Husky

## Pull requests

- [Sprint 1](https://github.com/mironovsergey/middle.messenger.praktikum.yandex/pull/2)
- [Sprint 2](https://github.com/mironovsergey/middle.messenger.praktikum.yandex/pull/3)
- [Sprint 3](https://github.com/mironovsergey/middle.messenger.praktikum.yandex/pull/4)
- [Sprint 4](https://github.com/mironovsergey/middle.messenger.praktikum.yandex/pull/5)
