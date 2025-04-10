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
├── backend/               # Symfony backend
│   ├── docker/            # Dockerfile for backend
└──docker-compose.yml      # Main Docker
```