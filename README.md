# 🔗 URL Shortener — Тестовое задание

Полноценное fullstack-приложение для сокращения ссылок. Состоит из backend (NestJS + PostgreSQL), frontend (React + TypeScript) и docker-compose окружения для локального запуска.

---

## 🌐 Демо

🚀 [Посмотреть онлайн](https://shorten-url-frontend-production.up.railway.app/)

---

## 📦 Стек технологий

* 🛠️ Backend: **NestJS**, **TypeScript**, **PostgreSQL**, **TypeORM**
* 💻 Frontend: **React**, **TypeScript**, **Vite**
* 🔁 CI/CD: возможно через **GitHub Actions**
* 🐳 Docker: `Dockerfile`, `docker-compose`

---

## 📂 Структура проекта

```
.
├── backend/              # Backend API на NestJS
├── frontend/             # Веб-интерфейс на React
├── docker-compose.yml
├── docker-compose.dev.yml
└── README.md
```

---

## 🚀 Быстрый старт

### 🔽 1. Клонируйте репозиторий

```bash
git clone https://github.com/your-repo/url-shortener.git
cd url-shortener
```

### ⚙️ 2. Создайте `.env` файлы

#### 📁 `backend/.env`

```env
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=shortener
APP_PORT=3000
```

#### 📁 `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## 🐳 Запуск с Docker Compose

### 📦 Продакшн-сборка:

```bash
docker-compose up --build
```

Доступ к сервисам:

* 🌐 Frontend: [http://localhost:5173](http://localhost:5173)
* 🛠️ Backend API: [http://localhost:3000](http://localhost:3000)

### 🛠️ Для разработки:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

---

## ⚙️ Основной функционал (из ТЗ)

### 📡 Backend

1. **Создание короткой ссылки**
   `POST /shorten`

   * `originalUrl`: строка, обязательное поле
   * `alias`: (опционально) свой алиас (до 20 символов)
   * `expiresAt`: (опционально) дата истечения

2. **Переадресация**
   `GET /:shortUrl`

3. **Информация о ссылке**
   `GET /info/:shortUrl`

4. **Удаление ссылки**
   `DELETE /delete/:shortUrl`

5. **Аналитика переходов**
   `GET /analytics/:shortUrl`

   * Общее количество переходов
   * Последние 5 IP-адресов

---

## 🧪 Тесты

* ✅ Проверка создания ссылки с уникальным alias
* ✅ Проверка переадресации на оригинальный URL

---

## 💡 Заметки

* Используются `docker-compose` и `Dockerfile` для сборки и запуска всех сервисов.
* Возможна быстрая деплой-интеграция через **Railway**

---
