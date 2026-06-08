<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5"/>
  <img src="https://img.shields.io/badge/Vite-4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 4"/>
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 4"/>
  <img src="https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
</p>

# 💬 Palaver

**Share. Connect. Discuss.**

Palaver is a full-stack social media platform where users can share posts with images, connect with friends, like and comment on content, and view profiles — all wrapped in a beautiful, responsive UI with dark/light mode support. Built as a Progressive Web App (PWA) for installable, native-like experience across devices.

---

## ✨ Features

- **📝 Rich Posts** — Create posts with text descriptions and image uploads, stored efficiently via GridFS.
- **❤️ Likes & Comments** — Engage with posts through likes (toggle on/off) and comments.
- **👥 Friend System** — Add and remove friends with a bidirectional friendship model.
- **👤 User Profiles** — View any user's profile with their posts, friend list, location, occupation, and profile stats (views & impressions).
- **🔐 Authentication** — Secure registration and login with bcrypt password hashing and JWT tokens.
- **🖼️ Image Uploads** — Profile pictures and post images uploaded via Multer and stored in MongoDB GridFS.
- **🌙 Dark / Light Mode** — Toggle between themes with the setting persisted across sessions via Redux Persist.
- **⚡ Redis Caching** — Server-side caching for posts, users, and friend lists with automatic invalidation on mutations.
- **📱 PWA Support** — Installable as a Progressive Web App with offline caching via Workbox.
- **🚀 Code Splitting** — Lazy-loaded routes with React Suspense for fast initial loads.
- **🧪 Testing** — Client-side tests with Vitest + Testing Library, server-side tests with Jest + Supertest.

---

## 🏗️ Architecture

```
palavar/
├── client/                        # React Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── FlexBetween/       # Flex layout utility
│   │   │   ├── Friend/            # Friend card component
│   │   │   ├── Loader/            # Loading spinner
│   │   │   ├── Message/           # Message display
│   │   │   ├── Page/              # Page wrapper (SEO titles)
│   │   │   ├── UserImage/         # User avatar component
│   │   │   └── WidgetWrapper/     # Card wrapper with theme
│   │   ├── scenes/                # Page-level components
│   │   │   ├── homePage/          # Feed with posts & widgets
│   │   │   ├── loginPage/         # Login & registration forms
│   │   │   ├── profilePage/       # User profile view
│   │   │   ├── navbar/            # Top navigation bar
│   │   │   └── widgets/           # Sidebar & feed widgets
│   │   │       ├── MyPostWidget    # Create new post
│   │   │       ├── PostWidget      # Single post display
│   │   │       ├── PostsWidget     # Post feed
│   │   │       ├── UserWidget      # User info sidebar
│   │   │       ├── FriendListWidget # Friends list
│   │   │       └── AdvertWidget    # Sponsored content
│   │   ├── reducers/              # Redux Toolkit slices
│   │   │   └── authReducer.ts     # Auth, posts, theme state
│   │   ├── theme.ts               # MUI theme with custom palette
│   │   ├── App.tsx                # Routes & theme provider
│   │   └── main.tsx               # Entry point with Redux store
│   ├── tests/                     # Frontend tests (Vitest)
│   ├── vite.config.ts             # Vite + PWA configuration
│   └── netlify.toml               # Netlify deployment config
│
└── server/                        # Node.js Backend (Express)
    ├── controllers/
    │   ├── auth.js                # Register & login logic
    │   ├── posts.js               # CRUD for posts + likes
    │   ├── users.js               # User profile & friends
    │   └── assets.js              # GridFS file serving
    ├── models/
    │   ├── User.js                # User schema (Mongoose)
    │   ├── Post.js                # Post schema (Mongoose)
    │   └── Gridfile.js            # GridFS file model
    ├── routes/
    │   ├── auth.js                # Auth endpoints
    │   ├── posts.js               # Post endpoints
    │   ├── users.js               # User endpoints
    │   └── assets.js              # Asset serving endpoints
    ├── middleware/
    │   ├── auth.js                # JWT verification middleware
    │   └── cache.js               # Redis client & cache headers
    └── tests/                     # Backend tests (Jest)
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite, MUI 5 |
| **State** | Redux Toolkit, Redux Persist |
| **Forms** | Formik + Yup validation |
| **Backend** | Node.js, Express 4 |
| **Database** | MongoDB (Mongoose ODM) |
| **File Storage** | MongoDB GridFS (via Multer) |
| **Caching** | Redis |
| **Auth** | JWT (jsonwebtoken), bcrypt |
| **Testing** | Vitest, Jest, Supertest, Testing Library |
| **Deployment** | Netlify (client), GitHub Actions (CI/CD) |
| **PWA** | vite-plugin-pwa + Workbox |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Redis** instance (local or [Redis Cloud](https://redis.com/cloud/))

### Server Setup

```bash
cd server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
JWT_SECRET=your_jwt_secret_here
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/palaver
PORT=3001
REDIS_URL=redis://localhost:6379
POST_EXPIRE_TIME=3600
USER_EXPIRE_TIME=3600
FRIENDS_EXPIRE_TIME=3600
FILE_EXPIRE_TIME=300
```

```bash
# Start the server (with hot reload)
npm start
```

The API will be running at `http://localhost:3001`.

### Client Setup

```bash
cd client

# Install dependencies
npm install

# Configure environment variables
cp .env .env.local   # Edit with your API server URL if needed

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user (multipart: `picture` + user fields) |
| `POST` | `/auth/login` | Login with email & password → returns JWT |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users/:id` | Get user profile by ID |
| `GET` | `/users/:id/friends` | Get user's friend list |
| `PATCH` | `/users/:id/:friendId` | Add or remove a friend |

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/posts/` | Get all posts (feed) |
| `POST` | `/posts/` | Create a new post (multipart: `picture` + post fields) |
| `GET` | `/posts/:userId/posts` | Get all posts by a specific user |
| `PATCH` | `/posts/:id/like` | Like or unlike a post |

### Assets

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/assets/:id` | Serve an uploaded file from GridFS |

> All endpoints except `/auth/*` require a valid JWT in the `Authorization: Bearer <token>` header.

---

## 🧪 Testing

```bash
# Run client tests
cd client
npm test

# Run server tests
cd server
npm test
```

---

## 🚢 Deployment

### Client (Netlify)

The client is configured for Netlify deployment via `netlify.toml`:

```bash
cd client
npm run build    # Outputs to ./build
```

### CI/CD

GitHub Actions workflows are configured in `.github/workflows/` for automated deployment.

---

## 📄 License

This project is for personal/educational use.
