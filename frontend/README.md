# React Frontend for Backend API Testing

This is a minimal React (Vite) frontend that connects to your Django backend.

## Included pages

- `API Tester`: test all Song APIs (`GET /songs/`, `POST /songs/add`, `PUT /songs/update/{id}`, `DELETE /songs/delete/{id}`).
- `Register`: `POST /register/`
- `Login`: `POST /login/` (saves access and refresh tokens in local storage)
- `Profile`: `GET /profile/` using Bearer access token

## Run

1. Start backend from `server`:
   - `python manage.py runserver`
2. Start frontend from `server/frontend`:
   - `npm install`
   - `npm run dev`
3. Open:
   - `http://localhost:5173`

## Config

- API base URL is in `src/api.js` as `http://127.0.0.1:8000`.
