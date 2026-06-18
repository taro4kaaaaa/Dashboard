🚀 DevOps Dashboard

DevOps Dashboard — контейнеризированное веб-приложение для управления инфраструктурными задачами и мониторинга сервисов.

Проект демонстрирует практические навыки работы с Docker, Docker Compose, Redis, CI/CD и GitHub Actions.

⸻

🌐 Demo

Frontend:
https://dashboard-cyan-eight-70.vercel.app

⸻

📸 Screenshots

Dashboard

<img src="./frontend/public/dashboard.gif" width="700"/>

Управление инфраструктурными задачами:

* создание задач
* изменение статуса
* изменение приоритета
* удаление задач
* хранение данных через REST API

⸻

Analytics

<img src="./frontend/public/analytic.png" width="700"/>

Визуализация метрик задач:

* распределение по статусам
* распределение по приоритетам
* аналитические графики
* сводная статистика

⸻

🏗 Architecture

Frontend (React)
        │
        ▼
Backend API (Node.js / Express)
        │
        ▼
Redis

Контейнеризация:

Docker Compose
├── frontend
├── backend
└── redis

⸻

✨ Features

Task Management

* Create Task
* Delete Task
* Update Status
* Update Priority

REST API

Backend реализует:

GET    /services
POST   /services
PATCH  /services/:id
DELETE /services/:id

Redis Storage

Все задачи хранятся в Redis.

При запуске приложения выполняется инициализация данных.

Analytics

Реализована визуализация:

* Todo Tasks
* In Progress Tasks
* Done Tasks
* Priority Distribution

Containerization

Проект полностью контейнеризирован:

* Docker
* Docker Compose
* Multi-container architecture

⸻

⚙️ CI/CD

Настроен CI Pipeline на GitHub Actions.

При каждом push выполняется:

Git Push
    │
    ▼
GitHub Actions
    │
    ├── Frontend Build
    ├── Backend Build
    └── Docker Image Build

Pipeline автоматически проверяет:

* корректность сборки frontend
* корректность сборки backend
* успешную сборку Docker-образов

⸻

🛠 Tech Stack

Frontend

* React
* TypeScript
* Zustand
* React Router
* Recharts

Backend

* Node.js
* Express

Infrastructure

* Docker
* Docker Compose
* Redis

CI/CD

* GitHub Actions

⸻

🚀 Run Locally

Clone repository:

git clone https://github.com/taro4kaaaaa/Dashboard.git
cd Dashboard

Run application:

docker compose up --build

Available services:

Frontend → http://localhost:5173
Backend API → http://localhost:3000/services
Redis → localhost:6379

⸻

📈 DevOps Skills Demonstrated

* Containerization with Docker
* Multi-container applications
* Docker Compose orchestration
* Redis integration
* REST API development
* CI pipelines with GitHub Actions
* Automated Docker image validation
* Infrastructure-oriented project architecture