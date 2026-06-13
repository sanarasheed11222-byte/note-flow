# NoteFlow 📝

A full stack notes app with authentication built with Node.js, Express, MySQL and vanilla JavaScript.

## 🌐 Live Demo
Runs locally — see setup instructions below.

## ✨ Features
- User authentication (register and login)
- Create, edit and delete notes
- Search notes in real time
- Filter by categories (General, Work, Personal, Ideas)
- Tags support
- Auto save while typing
- Beautiful dark theme UI

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL (XAMPP/phpMyAdmin)
- **Auth:** JWT, bcryptjs

## 🚀 Setup & Run Locally

### Prerequisites
- Node.js
- XAMPP (for MySQL)

### Steps
1. Clone the repo
2. Start XAMPP and MySQL
3. Create database `notes_app`
4. Setup backend:
```bash
cd backend
npm install
node server.js
```
5. Open `frontend/index.html` with Live Server

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register user |
| POST | /api/v1/auth/login | Login user |
| GET | /api/v1/notes | Get all notes |
| POST | /api/v1/notes | Create note |
| PUT | /api/v1/notes/:id | Update note |
| DELETE | /api/v1/notes/:id | Delete note |

## 👩‍💻 Author
Sana Rasheed
