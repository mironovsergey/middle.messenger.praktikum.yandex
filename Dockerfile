# Использование базового образа Node.js
FROM node:latest

# Установка директории приложения
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование остальных файлов проекта
COPY . .

# Сборка проекта
RUN npm run build

# Определение порта, который будет прослушивать приложение
EXPOSE 3000

# Запуск сервера приложения
CMD [ "node", "server.js" ]
