# Task1 - Django + React API Playground

This project is a full-stack app with:
- A Django REST backend (`server`) for song CRUD and JWT authentication
- A React + Vite frontend (`frontend`) for testing and interacting with the API

It is designed as a simple API learning/testing project with a clean UI for making requests.

## Project Structure

```text
Task1/
  frontend/   # React (Vite) client
  server/     # Django backend API
```

## Features

- Song APIs:
  - `GET /songs/`
  - `POST /songs/add`
  - `PUT /songs/update/{id}`
  - `DELETE /songs/delete/{id}`
- User auth APIs:
  - `POST /register/`
  - `POST /login/` (returns JWT access/refresh tokens)
  - `GET /profile/` (protected, requires Bearer token)
- Frontend pages:
  - API Tester
  - Register
  - Login
  - Profile

## Tech Stack

- Backend: Django, Django REST Framework, Simple JWT, django-cors-headers
- Frontend: React, React Router, Vite
- Database: PostgreSQL

## Prerequisites

- Python 3.10+ (recommended)
- Node.js 18+ and npm
- PostgreSQL running locally

## Backend Setup (`server`)

1. Open terminal in `server`.
2. Create and activate a virtual environment.
3. Install dependencies:
   - `pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary`
4. Create env file:
   - Copy `server/.env.example` to `server/.env`
   - Update `DB_PASSWORD` and other values for your local setup
5. Apply migrations:
   - `python manage.py migrate`
6. Run backend:
   - `python manage.py runserver`

Backend runs at: `http://127.0.0.1:8000`

### Environment Config

Backend credentials and settings are loaded from `server/.env`.
Use `server/.env.example` as the template.

Available environment variables:
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

## Frontend Setup (`frontend`)

1. Open terminal in `frontend`.
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`

Frontend runs at: `http://localhost:5173`

The frontend API base URL is set in `frontend/src/api.js`:
- `http://127.0.0.1:8000`

## Running the Full App

Run both services in parallel:
- Backend (`server`): `python manage.py runserver`
- Frontend (`frontend`): `npm run dev`

Then open `http://localhost:5173` in your browser.

## Notes

- CORS is enabled for local Vite ports (`5173`, `5174`) in backend settings.
- JWT tokens are stored in browser local storage by the frontend after login.
- This setup is for local development (debug mode is enabled in Django settings).
- `server/.env` is gitignored to avoid committing credentials.
