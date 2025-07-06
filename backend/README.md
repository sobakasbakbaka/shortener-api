# 🛡️ Backend — Shortener API

Этот проект — backend часть сервиса сокращения ссылок и аналитики переходов. Реализован на **NestJS** с использованием **TypeScript**.

---

## ✨ Основные возможности

- Создание коротких ссылок
- Перенаправление по коротким ссылкам
- Сбор и предоставление аналитики переходов
- REST API для интеграции с фронтендом 

---

## 🛠️ Технологии

| Технология    | Назначение          |
| ------------- | ------------------- |
| 🛡️ NestJS     | Серверный фреймворк |
| 🗾 TypeScript | Типизация           |
| 🐘 PostgreSQL | Хранение данных     |
| 🐳 Docker     | Контейнеризация     |
| 🧪 Jest       | Тестирование        |

---

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск в режиме разработки

```bash
npm run start:dev
```

### 3. Сборка и запуск в продакшене

```bash
npm run build
npm run start:prod
```

### 4. Переменные окружения

Создайте файл `.env` на основе `.env.example` и укажите параметры подключения к базе данных и другие настройки.

---

## 🐳 Docker

### Быстрый запуск

```bash
docker build -t shortener-backend .
docker run -p 3000:3000 shortener-backend
```

### Совместно с frontend (`docker-compose`)

```bash
docker-compose up
```

---

## 🧪 Тестирование

```bash

# E2E-тесты
npm run test:e2e

```

---

## 📁 Структура проекта

```
backend/
├── src/
│   ├── app.module.ts         # Главный модуль приложения
│   ├── main.ts               # Точка входа
│   ├── analytics/            # Модуль аналитики переходов
│   │   ├── analytics.controller.ts
│   │   ├── analytics.service.ts
│   │   └── entities/
│   │       └── click.entity.ts
│   └── url/                  # Модуль сокращения ссылок
│       ├── url.controller.ts
│       ├── url.service.ts
│       ├── dto/
│       │   └── create-url.dto.ts
│       └── entities/
│           └── url.entity.ts
├── test/                     # E2E-тесты
│   ├── analytics.e2e-spec.ts
│   ├── app.e2e-spec.ts
│   └── url.e2e-spec.ts
├── Dockerfile                # Docker-сборка
├── docker-compose.yml        # Docker Compose
└── ...                       # Прочие конфиги и файлы
```

---


> 💡 Для работы требуется PostgreSQL. Проверьте настройки подключения в `.env` или используйте docker-compose для локального запуска базы данных.
