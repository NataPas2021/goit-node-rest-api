# Використовуємо офіційний образ Node.js в якості базового образу
FROM node:20.12.0

# Створюємо робочу директорію для додатку
WORKDIR /app

# Копіюємо файли package.json та package-lock.json та встановлюємо залежності
COPY package*.json ./

#Для встановлення залежностей JS
RUN npm ci

# Копіюємо всі файли додатку у робочу директорію
COPY . .

# Внутрішній порт 3000 в контейнері буде відкритий для з'єднань
EXPOSE 3000

# Встановлюємо команду, яку Docker буде виконувати при запуску контейнера
CMD [ "node", "server" ]