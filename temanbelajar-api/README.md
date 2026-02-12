# 🎓 TemanBelajar API

![NodeJS](https://img.shields.io/badge/Node.js-v20.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-v4.x-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

**TemanBelajar API** is a robust backend service designed to facilitate mentoring sessions between students and mentors. Built with a scalable MVC architecture, it handles user authentication, role-based access control (RBAC), and a smart booking system with conflict detection.

---

## 🌟 Key Features

- **🔐 Secure Authentication**: Implements `bcrypt` for password hashing and `JWT` (JSON Web Tokens) for stateless authentication.
- **👥 Role-Based Access Control (RBAC)**:
  - **Student**: Browse subjects, book mentoring sessions, view booking history.
  - **Mentor**: Manage profile, receive booking requests, **Approve/Reject** sessions.
- **📅 Smart Scheduling**: Automatically prevents double-booking. The system rejects booking requests if the mentor is already busy at the requested time.
- **🗄️ Relational Database**: Complex data modeling using Prisma ORM (One-to-Many & Many-to-Many relationships).

---

## 🛠 Tech Stack

| Component     | Technology   | Description                                |
| :------------ | :----------- | :----------------------------------------- |
| **Runtime**   | Node.js      | JavaScript runtime environment             |
| **Framework** | Express.js   | Web framework for building RESTful APIs    |
| **Database**  | PostgreSQL   | Relational database management system      |
| **ORM**       | Prisma       | Next-generation Node.js and TypeScript ORM |
| **Auth**      | JWT & Bcrypt | Security standard for token-based auth     |
| **Dev Tools** | Nodemon      | Auto-restart server during development     |

---

## 📂 Project Structure

This project follows the **Model-View-Controller (MVC)** pattern for better maintainability.

```bash
temanbelajar-api/
│
├── prisma/
│   └── schema.prisma      # Database Schema & Data Modeling
├── src/
│   ├── controllers/       # Business Logic (Auth, Booking, Subject)
│   ├── middlewares/       # Security Layers (Token Verification)
│   ├── routes/            # API Endpoints
│   ├── utils/             # Helper functions & Database Client
│   └── index.js           # App Entry Point
├── .env                   # Environment Variables
├── package.json           # Project Dependencies
└── README.md              # Documentation
```

## 🚀 Getting Started

Follow these steps to run the project locally.

1. **Prerequisites\***
   Make sure you have installed:

Node.js (v16 or higher)

PostgreSQL

2. **Clone the Repository**

```bash
git clone [https://github.com/your-username/temanbelajar-api.git](https://github.com/your-username/temanbelajar-api.git)
cd temanbelajar-api
```

3. **Install Dependencies**

```bash
npm install
```

4. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
```

5. **database Migration**

```bash
npx prisma migrate dev --name init
```

6. **Start the Server**

```bash
# Development Mode (with Nodemon)
npm run dev

# Production Mode
npm start
```

the server will start at: `http://localhost:6767`

## 🔌 API Documentation

You can test these endpoints using Postman or cURL.

## 🔐 Authentication

1. **Register User**

- URL: `POST /api/auth/register`
- Body:

```json
{
  {
  "name": "Rifqi Alimin",
  "email": "rifqi@umy.ac.id",
  "password": "securepassword",
  "role": "STUDENT"  // or "MENTOR"
}
```

2. **Login User**

- URL: `POST /api/auth/login`
- Body:

```json
{
  "email": "yourmail@umy.ac.id",
  "password": "securepassword"
}
```

-Resoinse: Return a `token`. copy this token for the next steps.

## 📚 Subjects

1. **Get All Subjects**

- URL: `GET /api/subjects`
- Auth: None Required.

2. **Create Subject (Mentor Only)**

- URL: `POST /api/subjects`
- Auth: Bearer Token (Mentor Role Required)
- Body:

```json
{
  "name": "Mathematics"
}
```

## 📅 Bookings

1. **Create Booking (Student Only)**

- URL: `POST /api/bookings`
- Auth: Bearer Token (Student Role Required)
- Body:

```json
{
  "mentorId": 2,
  "subjectId": 1,
  "scheduledAt": "2024-07-01T10:00:00Z"
}
```

Note: The system will return a `400 Error` if the mentor is already booked at that time.

2.  **Get Bookings (Student & Mentor)**

- URL: `GET /api/bookings`
- Auth: Bearer 1`<Token>`
- Description:
  - Student: Returns list of bookings made.
  - Mentor: Returns list of incoming booking requests.

3. **Update Booking Status (Mentor Only)**

- URL: `PUT /api/bookings/:bookingId`
- Auth: Bearer Token (Mentor Role Required)
- Body:

```json
{
  "status": "APPROVED" // or "REJECTED"
}
```

---

## 👨‍💻 Author

**Muhammad Rifqi Alimin**
-Information Technology Student at _Universitas Muhammadiyah Yogyakarta (UMY)_
