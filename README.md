# StickIt 🧠 – Fullstack Sticky Notes App (Symfony + React)

StickIt is a fullstack sticky notes application that lets users register, log in, and interact with draggable notes on a virtual board. Built with **Symfony**, **MySQL**, **React**, and **SCSS**, and powered by **JWT authentication** via secure HTTP-only cookies.  
Dockerized for easy local development and includes a full **Postman Collection** for API testing.

---

## 📦 Tech Stack

- **Backend**: Symfony 6.x (PHP 8.4)
- **Frontend**: React (with SCSS Modules)
- **Database**: MySQL 8
- **Auth**: JWT + HTTP-only cookies
- **Dev Environment**: Docker, Docker Compose

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/sztanga/stickit
```

### 2. Create .env files

```bash
cp .env.example .env
```

```bash
cp backend/.env.example backend/.env
```

```bash
cp frontend/.env.example frontend/.env
```

### 3. Start the App with Docker

```bash
docker compose up --build
```

### 4. Setup DB

Enter bash inside of the backend container
```bash
docker compose exec backend bash
```

Run migrations
```bash
php bin/console doctrine:migrations:migrate
```

Create Database for testing
```bash
php bin/console doctrine:database:create --env=test
```

Run migrations for testing database
```bash
php bin/console doctrine:migrations:migrate --env=test
```

### Environment URLs:
- Symfony API: http://localhost:8000
- React Frontend: http://localhost:19999

## 📁 Project Structure

```bash
stickit/
├── backend/                                # Symfony backend (JWT auth, API)
│   ├── docker/                             # Backend Dockerfile
│   └── src/Controller/AuthController.php   # Authentication Controller
│   └── src/Controller/NoteController.php   # API Controller
├── frontend/                               # React frontend (Login/Register/Notes UI)
│   ├── docker/                             # Frontend Dockerfile + nginx config
│   └── src/
│       ├── components/                     # Reusable components (auth, layout, notes)
│       ├── hooks/                          # Custom hooks (useAuth)
│       ├── pages/                          # Login/Register layout pages
│       └── App.js                          # App routing & route protection
├── StickIt.postman_collection.json         # Postman API test collection
└── docker-compose.yml                      # Unified backend + frontend services
```

## 🔐 Authentication

- Users register with email + password
- Login issues a JWT token stored in an HTTP-only secure cookie
- All notes routes are protected
- Backend returns 401 Unauthorized if token is missing/invalid
- Frontend globally handles 401s and redirects to /login

## 📮 API Usage (via Postman)

Import the [StickIt.postman_collection.json](StickIt.postman_collection.json) from the root directory into Postman.

The collection already contains all endpoints and the sample data so I won't put it here.

I will only explain it briefly.

### Auth Flow:
1. POST /api/register:
   - Register with { email, password }

2. POST /api/login
   - Logs in and stores JWT in HTTP-only cookie

3. Authenticated requests include the cookie automatically

4. Use /api/notes endpoints:
   - GET /api/notes
   - POST /api/notes
   - PUT /api/notes/{id}
   - DELETE /api/notes/{id}

## 🖼 Frontend Features

### ✅ Auth

- `/login`: Login with email/password
- `/register`: Quick account creation (no email verification)
- Auto-redirects after login/logout
- Route protection: guests can't access `/notes`, logged-in users can't access `/login` or `/register`

### 🗂 Notes Board

- Right-click anywhere to open context menu → "Create Note"
- Notes are interactive and draggable
- Notes display:
  - 🎨 5 color options
  - 📏 Depth control: -1 / 0 / +1
  - 📝 Text area with character limit based on size
  - 👤 Author’s email
- If any change is detected in a note, a 💾 Save button appears
- Clicking Save persists the update via the API
- Notes are draggable; positions are saved automatically on release
- Users can only modify/delete their own notes
- ⚠️ Confirmation popup appears before deletion
- 💬 Toasts for "Note saved", "Position updated", or error messages
- ❌ Tip at top-right shows "Right-click to create note" (can be dismissed, but will show again on page refresh)

## 🔄 How the App Works – Behind the Scenes

### Backend (Symfony)

- Built using Symfony with Doctrine ORM and JWT Auth Bundle
- `User` and `Note` entities stored in MySQL
- Endpoints:
  - `/api/register`, 
  - `/api/login`, 
  - `/api/logout`
  - `/api/notes`: CRUD endpoints protected by JWT
  - `/api/me`: Returns current user's email (used on frontend)
- JWT is generated via `lexik/jwt-authentication-bundle`
- CORS, HTTP-only cookies and secure auth flow enforced

### Frontend (React)

- Uses React Router for navigation + protected/guest routes
- Axios client includes cookies with each request (`withCredentials: true`)
- `useAuth()` hook fetches `/api/me` to detect login state
- Drag-and-drop implemented with native events (no libraries)
- SCSS Modules provide isolated styles and mobile responsiveness

## ✅ Auth Flow Logic

- `/login`: Guest only → redirects to /notes if logged in
- `/register`: Guest only → redirects to `/notes` if logged in
- `/notes`: Auth only → redirects to `/login` if not logged in
- `/`: Redirects to `/login` by default

## 🧠 Development Notes
- Auth is handled via secure cookies to prevent localStorage/sessionStorage leaks
- Postman collection helps with manual API testing
- Designed with separation of concerns: backend/ and frontend/ in one repo only to make it easier for you to test, but ideally should be split into two
- No JS libraries for dragging/sorting — everything is native, lightweight and efficient

## 🧪 Unit & Functional Testing

This project uses PHPUnit with Symfony’s test tools to ensure 100% backend test coverage across all major components.

### ✅ What’s Covered
- User entity – getters, setters, roles, associations
- Note entity – all fields and relationships
- AuthController:
  - /api/register
  - /api/logout
  - /api/me
- NoteController:
  - /api/notes CRUD
  - Authorization (own notes only)
  - Error conditions (missing note, access denied)

### 📁 Where to Find Tests
```bash
backend/
└── tests/
    ├── Entity/
    │   ├── UserTest.php
    │   └── NoteTest.php
    └── Controller/
        ├── AuthControllerTest.php
        └── NoteControllerTest.php
```

### 🛠️ How to Run
Run from within the backend container:
```bash
docker compose exec backend php bin/phpunit
```

