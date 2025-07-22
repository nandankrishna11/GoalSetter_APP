# GoalSetter APP

A full-stack MERN (MongoDB, Express, React, Node.js) application for setting and tracking personal goals. The app features user authentication, goal CRUD operations, and a modern React frontend with Redux state management.

## Features
- User registration and login (JWT authentication)
- Create, read, update, and delete personal goals
- Secure backend with Express, MongoDB, and security middleware
- Modern React frontend with Redux Toolkit

## Project Structure
- `backend/` — Node.js/Express API, MongoDB models, authentication, and goal management
- `frontend/` — React app bootstrapped with Create React App and Redux Toolkit

## Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB database (local or cloud, e.g., MongoDB Atlas)

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd GoalSetter-APP
```

### 2. Setup environment variables
Create a `.env` file in the `backend/` directory with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Install dependencies
```bash
npm install
cd frontend && npm install
```

### 4. Run the app
#### Development (concurrently runs backend and frontend):
```bash
npm run dev
```
- Backend: [http://localhost:5000](http://localhost:5000)
- Frontend: [http://localhost:3000](http://localhost:3000)

#### Individually:
- Backend: `npm run server`
- Frontend: `npm start --prefix frontend`

## API Endpoints
- `POST /api/user` — Register
- `POST /api/user/login` — Login
- `GET /api/user/me` — Get user profile (auth required)
- `GET/POST /api/goals` — Get or create goals (auth required)
- `PUT/DELETE /api/goals/:id` — Update or delete a goal (auth required)

## Frontend
See [`frontend/README.md`](frontend/README.md) for more details on available scripts and development tips.

## License
ISC

---
**Author:** Nandan 