# 📋 Task Management System

> A modern, full-stack task management application with beautiful UI and robust authentication

[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.4+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🎯 Overview

A feature-rich task management application built with the MERN stack (MongoDB, Express, React, Node.js). This application provides a seamless experience for managing tasks with JWT authentication, role-based access control, and a beautiful glassmorphism UI design.

---

## 🖼️ Live Demo & Preview



<div align="center">

### Dashboard
![Dashboard Preview](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e6f4930b-905c-4067-8330-757b3e3f4367" />
)

### Authentication
<div style="display: flex; gap: 20px;">
  
![Login Preview](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e6e5bbaa-fed1-49f2-a76e-7c7521b8130a" />
)
![Register Preview](<img width="940" height="858" alt="image" src="https://github.com/user-attachments/assets/b967e70c-d3a0-4985-92f9-f72bf838ff0a" />
)


</div>

</div>

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with secure token management
- Role-based access control (User & Admin roles)
- Password hashing using bcryptjs
- Protected routes and automatic token refresh
- Secure logout with token cleanup

### ✅ Task Management
- **Full CRUD Operations** - Create, Read, Update, Delete tasks
- **Priority Levels** - Low, Medium, High, Urgent
- **Status Tracking** - Pending, In Progress, Completed, Cancelled
- **Real-time Statistics** - Dashboard with visual analytics
- **Advanced Filtering** - By status, priority, and search terms
- **Task Archiving** - Soft delete functionality

### 🎨 Modern UI/UX
- Glassmorphism design with backdrop blur effects
- Responsive layout optimized for all device sizes
- Dark theme with gradient backgrounds
- Smooth animations and micro-interactions
- Loading states and error handling
- Accessible components with proper ARIA labels

### 🛠️ Technical Excellence
- RESTful API with proper HTTP status codes
- Input validation and sanitization
- Comprehensive error handling
- Database relationships and data integrity
- API versioning for future scalability
- Clean code architecture with separation of concerns

---

## 🚀 Technology Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| ⚛️ **React** | UI Framework | 18.2+ |
| ⚡ **Vite** | Build Tool & Dev Server | 4.4+ |
| 🎨 **Tailwind CSS** | Styling Framework | 3.3+ |
| 🧭 **React Router** | Client-side Routing | 6.15+ |
| 📡 **Axios** | HTTP Client | 1.5+ |
| 🎯 **Lucide React** | Modern Icons | 0.279+ |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| 🟢 **Node.js** | Runtime Environment | 16+ |
| 🚂 **Express.js** | Web Framework | 4.18+ |
| 🍃 **MongoDB** | NoSQL Database | 4.4+ |
| 📦 **Mongoose** | MongoDB ODM | 7.5+ |
| 🔑 **JWT** | Authentication | 9.0+ |
| 🔒 **bcryptjs** | Password Hashing | 2.4+ |
| ✔️ **express-validator** | Input Validation | 7.0+ |

---

## 📁 Project Structure

```

```

---

## 🚀 Quick Start Guide

### Prerequisites

Ensure you have the following installed:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Git** - [Download](https://git-scm.com/)

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd task-management-system
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**

```env
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secure-jwt-secret-key-change-this
PORT=5000
NODE_ENV=development
```

```bash
# Start the backend server
npm run dev
```

✅ Backend should be running on `http://localhost:5000`

#### 3️⃣ Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend-new

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend should be running on `http://localhost:5173`

---

## 🎮 Usage

### User Registration & Login

1. Navigate to `http://localhost:5173`
2. Click on "Create account here" to register
3. Fill in your details (Name, Email, Password, Role)
4. Login with your credentials

### Task Management

1. **Create Task** - Click "Add Task" button and fill in task details
2. **View Tasks** - Browse all your tasks on the dashboard
3. **Update Task** - Click edit icon to modify task details
4. **Delete Task** - Click delete icon to remove a task
5. **Filter Tasks** - Use filters to sort by status or priority
6. **Search Tasks** - Use the search bar to find specific tasks

---

## 🔧 Available Scripts

### Backend

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Frontend

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | ✅ |
| GET | `/api/tasks/:id` | Get single task | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |
| GET | `/api/tasks/stats` | Get task statistics | ✅ |

---

## 🔒 Environment Variables

### Backend (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/taskmanager

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS (Optional)
CLIENT_URL=http://localhost:5173
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the robust database
- Tailwind CSS for the utility-first CSS framework
- Lucide Icons for beautiful icon set
- All contributors and supporters

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ and ☕**

</div>
