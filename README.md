# 🏠 Roomyfy — Your Smart Indian Stay

> Find verified PGs, Flats, and Hostels across India. AI-curated, easy to book, and built for students & professionals.

![Roomyfy](https://img.shields.io/badge/Roomyfy-Live-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)

---

## 🌐 Live Demo

- **Frontend:** [roomyfy.vercel.app](https://roomyfy.vercel.app)
- **Backend:** [roomyfy-backend.onrender.com](https://roomyfy-backend.onrender.com)

---

## ✨ Features

- 🔐 **Authentication** — Register & Login with JWT
- 🏘️ **Property Listings** — Browse PGs, Flats, Hostels & Studios
- 🔍 **Smart Search** — Filter by city, price, type, amenities
- 📅 **Booking System** — Book rooms with one click
- 💬 **Chat System** — Real-time messaging between tenants & owners
- 📍 **Area Insights** — Safety scores & nearby places
- 📱 **Mobile First** — Beautiful UI for both mobile & desktop
- 🤖 **AI Price Suggestions** — Smart rent recommendations
- 🤝 Roommate Finder
- 👥 **Find Roommates** — Match with compatible roommates based on preferences
- 📋 **Roommate Profile** — Share lifestyle, habits, budget & location preferences  
- 🔍 **Smart Matching** — AI-based compatibility scoring
- 💬 **Connect Directly** — Chat with potential roommates before deciding
- 🏠 **Share Listings** — Post rooms looking for roommates
---

## 🛠️ Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React + TypeScript | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Shadcn/UI | UI Components |
| Framer Motion | Animations |
| React Router | Navigation |
| TanStack Query | Data Fetching |

### Backend
| Tech | Usage |
|------|-------|
| Node.js + Express | Server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Nodemon | Development |

---

## 📁 Project Structure

```
roomyfy-your-smart-indian-stay/
├── roomyfy-backend/
│   └── src/
│       ├── config/        # Database config
│       ├── controllers/   # Route controllers
│       ├── middleware/     # Auth middleware
│       ├── models/        # MongoDB models
│       ├── routes/        # API routes
│       └── server.js      # Entry point
│
└── roomyfy-frontend/
    └── src/
        ├── components/    # Reusable components
        ├── context/       # Auth context
        ├── data/          # Static data
        ├── hooks/         # Custom hooks
        ├── lib/           # API & utilities
        └── pages/         # App pages
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup

```bash
cd roomyfy-backend
npm install
```

Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd roomyfy-frontend
npm install --legacy-peer-deps
npm run dev
```

---

## 📱 Pages

| Page | Description |
|------|-------------|
| `/` | Home with featured rooms |
| `/search` | Search & filter rooms |
| `/room/:id` | Room details & booking |
| `/bookings` | My bookings |
| `/add` | List a new room |
| `/chats` | Messages |
| `/profile` | User profile |
| `/login` | Login & Register |

---

## 🔌 API Endpoints

### Auth
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Properties
```
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
```

### Bookings
```
POST   /api/bookings
GET    /api/bookings/my
PUT    /api/bookings/:id/cancel
```

### Chats
```
GET    /api/chats
POST   /api/chats
GET    /api/chats/:chatId/messages
POST   /api/chats/:chatId/messages
```

---

## 🚢 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Render](https://render.com)
- **Database** hosted on [MongoDB Atlas](https://mongodb.com/atlas)

---

## 👨‍💻 Developer

**Ritesh Rathore**
- GitHub: [@ritesh391](https://github.com/ritesh391)

---

## 📄 License

MIT License — feel free to use this project!

---

<p align="center">Made with ❤️ in India 🇮🇳</p>
