# 🛡️ secure-rbac-task-api (Backend)

A secure and scalable RESTful API built with **Node.js, Express, and MongoDB**, featuring **JWT authentication**, **Role-Based Access Control (RBAC)**, and **task management APIs**.

Designed with modular architecture, validation, and production-ready practices.

---

## 📌 Features

- 🔐 **Authentication**
  - User registration & login
  - Password hashing using bcrypt
  - JWT-based authentication

- 🛡️ **Authorization (RBAC)**
  - Role-based access (`user`, `admin`)
  - Protected routes using middleware

- 📝 **Task Management**
  - Create, Read, Update, Delete tasks
  - User-specific task ownership
  - Status tracking (Pending / Completed)

- ✅ **Validation**
  - Request validation using `express-validator`
  - Clean and secure input handling

- ⚙️ **Error Handling**
  - Centralized error middleware
  - Proper HTTP status codes and messages

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JSON Web Token (JWT)  
- **Security:** bcryptjs  
- **Validation:** express-validator  

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── controllers/      # Business logic (Auth, Tasks)
│   ├── middleware/       # Auth, RBAC, error handling
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── validators/       # Request validation logic
│   ├── config/           # DB connection, env config
│   └── app.js            # Express app setup
├── server.js             # Entry point
└── package.json
```

---

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/WRENCH1943/secure-rbac-task-api.git
cd secure-rbac-task-api/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of backend:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the server:
```bash
npm run dev
```

---

## 🚀 API Base URL

```
http://localhost:5000/api/v1
```

---

## 🔑 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint | Description |
|-------|---------|------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get token |

---

### 📝 Task Routes (Protected)

> Requires Bearer Token

| Method | Endpoint | Description |
|-------|---------|------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

---

## 🔒 Authentication

Include token in headers:

```bash
Authorization: Bearer <your_token>
```

---

## ⚠️ Error Handling

- Centralized error middleware
- Consistent JSON error responses:
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🧪 Validation

- Uses `express-validator`
- Validates:
  - Email format
  - Password strength
  - Task fields

---

## 🧑‍💻 Scripts

```bash
npm run dev     # Run with nodemon
npm start       # Production start
```

---

## 📄 License

This project is currently unlicensed.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!

Repository: https://github.com/WRENCH1943/secure-rbac-task-api
