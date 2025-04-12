# StickIt – Symfony + React Sticky Notes App

## Tech Stack

- Backend: Symfony (PHP 8.4)
- Database: MySQL 8

---

## Backend Setup Instructions (assuming you're in the root dir)

### 1. Clone

```bash
git clone https://github.com/sztanga/stickit
cd stickit
```

### 2. Create .env files

```bash
cp .env.example .env
cd backend/
cp .env.example .env
```

### 3. Build Docker Containers
```bash
docker compose up --build
```

## Project Structure

```bash
stickit/
├── backend/                        # Symfony backend
│   ├── docker/                     # Dockerfile for backend
└──docker-compose.yml               # Main Docker
└──StickIt.postman_collection.json  # Main Docker
```

## How I think
1. I started off with putting a plan of action. To make it easy for you to test I decided to create 2 directories: backend and frontend, normally I'd have 2 separate repos for both frontend and backend.
2. It was wiser to start with the backend first, expose API endpoints to the world and then proceed on the frontend.
3. I setup docker with php 8.4 and mysql 8.
4. I started off with registration, proceeded to the login, had some issues with JWT token but managed to sort it without spending too much time on fixing it.
5. Got login and logout working in no time. I've setup Postman Collection.
6. Started working on the notes, exposed CRUD endpoints via the api for authenticated users only.
7. 