# 🔧 Tool Lending Library - CRUD Application

## 📌 Overview

Tool Lending Library is a full-stack CRUD application that helps organizations manage tool inventory digitally.

The application replaces manual tracking systems with a secure, responsive, and user-friendly interface for managing tools.

---

## 🚀 Features

### Authentication
- User Registration and Login
- JWT Authentication
- Protected Routes
- Logout functionality

### Tool Management
- Create new tools
- View all tools
- Update tool details
- Delete tools
- Search and filter tools
- Inventory statistics dashboard

### Validation & Security
- Form validation
- Error handling
- XSS protection using DOMPurify
- Secure user authentication

### User Experience
- Responsive design
- Loading indicators
- Empty state handling
- Toast notifications
- Accessibility support (ARIA labels + keyboard navigation)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- CSS Modules
- Lucide React Icons
- DOMPurify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## 📂 Project Structure


tool-lending-library

├── client
│ ├── components
│ ├── pages
│ ├── services
│ └── context
│
└── server
├── models
├── routes
├── controllers
└── middleware


---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
Frontend Setup
cd client
npm install
npm run dev
Backend Setup
cd server
npm install
npm start
🧪 Testing

Run lint check:

npm run lint

Build project:

npm run build

Verified:

✅ CRUD operations
✅ Authentication flow
✅ Form validation
✅ Responsive design
✅ Loading and empty states
✅ Accessibility improvements

📊 Analytics Simulation

The application includes telemetry simulation:

[Analytics] Tool created
[Analytics] Tool updated
[Analytics] Tool deleted
🎯 Requirements Covered

✔ Feature Complete CRUD
✔ Error handling
✔ Input validation
✔ Secure data handling
✔ Responsive UI
✔ Accessibility support
✔ Production-ready structure
