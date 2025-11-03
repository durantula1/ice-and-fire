# Ice and Fire - Game of Thrones Character Explorer

A full-stack web application for exploring characters from the Game of Thrones universe. Browse characters, view detailed information, and curate your personal favorites list with a modern, responsive interface.

## Tech Stack

### Frontend (`ice-and-fire-app`)

- **Framework**: Angular 20.0.0
- **UI Library**: PrimeNG 20.2.0 with PrimeFlex
- **State Management**: NgRx (Store & Effects)
- **Styling**: SCSS with PrimeNG themes
- **HTTP**: Angular HttpClient with custom interceptors

### Backend (`ice-and-fire-server`)

- **Runtime**: Node.js with TypeScript
- **Framework**: Express 5.1.0
- **Authentication**: JWT tokens + bcrypt
- **Development**: ts-node-dev for hot reload

## Features

- **Character Browser** – Paginated list of all Game of Thrones characters
- **Character Details** – Comprehensive character information pages
- **User Authentication** – Secure registration and login system
- **Favorites Management** – Save and manage your favorite characters
- **Responsive Design** – Optimized for desktop and mobile devices
- **Protected Routes** – Auth guards for secure access control
- **Toast Notifications** – Real-time feedback for user actions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

#### 1. Frontend Setup

```bash
cd ice-and-fire-app
npm install
npm start
```

The app will be available at **http://localhost:4200**

#### 2. Backend Setup

```bash
cd ice-and-fire-server
npm install
npm run dev
```

The API will be available at **http://localhost:3000**

## Project Architecture

```
ice-and-fire/
├── ice-and-fire-app/          # Angular frontend
│   └── src/
│       ├── app/
│       │   ├── core/          # Services, guards, interceptors
│       │   ├── features/      # Feature modules
│       │   ├── layout/        # Layout components
│       │   └── shared/        # Shared components
│       └── environments/
│
└── ice-and-fire-server/       # Express backend
    └── src/
        ├── controllers/       # Route handlers
        ├── middlewares/       # Auth & validation
        ├── models/            # Data models
        └── routes/            # API routes
```

## API Endpoints

### Authentication

- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – User login

### Favorites

- `GET /api/favorites` – Get user's favorites
- `POST /api/favorites` – Add character to favorites
- `DELETE /api/favorites/:id` – Remove from favorites

## Development

Both applications support hot reload during development:

- Frontend changes automatically refresh the browser
- Backend restarts automatically with ts-node-dev
