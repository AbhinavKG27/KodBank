# KodBank 🏦

> A full-stack code snippet and resource bank — organize, search, and manage your code collections with secure authentication.

![TypeScript](https://img.shields.io/badge/TypeScript-96%25-3178c6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61dafb?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169e1?logo=postgresql&logoColor=white)

---

## 📖 About

**KodBank** is a full-stack web application for developers to store, organize, and retrieve code snippets and resources. It features a Node.js/Express REST API backend with JWT-based authentication, a PostgreSQL database hosted on [Neon](https://neon.tech), and a fast React + TypeScript frontend powered by Vite.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure sign-up and login with token-based auth
- 👤 **User Accounts** — Individual user profiles with protected routes
- 📁 **Code Snippet Storage** — Save and manage snippets in a PostgreSQL database
- 🎨 **Modern UI** — Built with shadcn/ui components and Tailwind CSS
- ⚡ **Fast Frontend** — Vite-powered React + TypeScript app
- 🌐 **REST API** — Clean Express.js backend with structured controllers and middleware
- ☁️ **Cloud Database** — PostgreSQL hosted on Neon (serverless Postgres)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| Tailwind CSS | Styling |
| shadcn/ui | Component Library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API Framework |
| JWT | Authentication |
| PostgreSQL (Neon) | Database |

---

## 📁 Project Structure

```
KodBank/
├── backend/
│   ├── controllers/
│   │   ├── authController.js     # Register, login, JWT logic
│   │   └── userController.js     # User-related operations
│   ├── middleware/               # JWT verification middleware
│   ├── routes/                   # Express route definitions
│   ├── db.js                     # PostgreSQL connection (Neon)
│   ├── migration.sql             # Database schema & migrations
│   ├── server.js                 # Express app entry point
│   ├── .env                      # Backend environment variables
│   ├── .env.example              # Environment variable template
│   └── package.json
│
├── public/                       # Static assets
├── src/                          # React frontend source
├── components.json               # shadcn/ui config
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Frontend dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Neon](https://neon.tech) account (or any PostgreSQL database)
- npm or [Bun](https://bun.sh/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/AbhinavKG27/KodBank.git
cd KodBank
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (see `.env.example` for reference):

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb
JWT_SECRET=your_super_secret_key_here
PORT=5000
VITE_API_URL=http://localhost:5000
```

#### Run Database Migrations

Run the schema against your PostgreSQL database:

```bash
psql $DATABASE_URL -f migration.sql
```

Or paste the contents of `migration.sql` directly into the Neon SQL editor.

#### Start the Backend Server

```bash
node server.js

# For development with auto-reload:
npx nodemon server.js
```

The backend API will be available at `http://localhost:5000`.

---

### 3. Frontend Setup

From the root `KodBank/` directory:

```bash
npm install
# or
bun install
```

Create a `.env` in the root:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 🔑 API Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/api/user/profile` | Get current user info | ✅ |

> JWT tokens should be sent via the `Authorization: Bearer <token>` header for protected routes.

---

## 🗄️ Database

KodBank uses **PostgreSQL** hosted on [Neon](https://neon.tech) — a serverless, cloud-native Postgres platform.

To set up from scratch:
1. Create a free project at [neon.tech](https://neon.tech)
2. Copy your connection string into `DATABASE_URL` in `backend/.env`
3. Execute `backend/migration.sql` against your database to create the schema

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source. Feel free to use and build upon it.

---

## 👤 Author

**Abhinav K G**
- GitHub: [@AbhinavKG27](https://github.com/AbhinavKG27)