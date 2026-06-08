# Task Management System

A production-ready Full Stack Task Management System built with **Node.js, Express.js, MongoDB, JWT Authentication, and Next.js**. The application demonstrates secure authentication, role-based authorization, scalable API architecture, and complete CRUD operations for task management.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* Password Hashing using bcryptjs
* Role-Based Access Control (Admin/User)

### Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Task Status Management
* User-specific Task Ownership

### Security

* JWT Verification Middleware
* Role Authorization Middleware
* Input Validation using express-validator
* Secure Password Storage
* Centralized Error Handling

### Frontend

* Register Page
* Login Page
* Protected Dashboard
* Task CRUD Interface
* Authentication Guards
* Success & Error Notifications

### Documentation

* Swagger API Documentation
* Postman Collection

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* express-validator

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Axios

### Deployment

* Backend: Render
* Frontend: Vercel
* Database: MongoDB Atlas

---

## Project Structure

```bash
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── validators/
├── utils/
└── server.js

frontend/
│
├── app/
├── components/
├── services/
└── middleware/
```

---

## API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Tasks

```http
POST   /api/v1/tasks
GET    /api/v1/tasks
GET    /api/v1/tasks/:id
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

---

## Demo Credentials

### Admin Account

```text
Email: admin@gmail.com
Password: password123
```

### User Account

```text
Email: user@gmail.com
Password: password123
```

---

## Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

JWT_EXPIRES_IN=7d
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Documentation



```

Postman Collection:

```text
Included in repository root
```

---

## Scalability Considerations

The application follows several scalability practices:

* API Versioning using `/api/v1`
* Modular MVC Architecture
* JWT Stateless Authentication
* Centralized Error Handling
* Database Indexing Support
* Ready for Redis Caching Integration
* Load Balancer Friendly Architecture
* Easy Migration to Microservices
* Environment-Based Configuration

---

## Future Enhancements

* Redis Caching
* Real-Time Notifications
* Activity Logs
* Email Notifications
* Docker Support
* Kubernetes Deployment
* Analytics Dashboard

---

## Author

**Himanshu Verma**

Full Stack Developer | MERN Stack Developer

* GitHub: https://github.com/vermahoney


---

## License

This project was developed as part of a Backend Developer Internship Assignment and is intended for educational and evaluation purposes.
