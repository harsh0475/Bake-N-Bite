# 🍰 Bake N Bite

<div align="center">

### Fresh Homemade Food Ordering Platform

A modern full-stack food ordering web application built for homemade food businesses. Customers can browse products, place orders, track their purchases, and manage their profiles, while administrators can efficiently manage products, categories, orders, customers, and analytics.

---

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

# 📖 Overview

Bake N Bite is a complete full-stack food ordering platform developed using modern web technologies. The application is designed for homemade food businesses, providing customers with an intuitive ordering experience while offering administrators a powerful dashboard to manage the entire business.

The project follows clean architecture principles with a scalable backend and a responsive mobile-first frontend.

---

# ✨ Features

## 👨‍🍳 Customer Features

- User Registration & Login
- JWT Authentication
- Browse Food Categories
- Search Products
- Product Details
- Add to Cart
- Update Cart
- Checkout
- Place Orders
- Order History
- Order Tracking
- User Profile Management
- Saved Addresses
- Product Reviews
- Wishlist
- Responsive Mobile UI

---

## 🛠 Admin Features

- Secure Admin Dashboard
- Product Management
- Category Management
- Product Image Upload
- Customer Management
- Order Management
- Review Management
- Sales Analytics
- Dashboard Statistics
- Inventory Monitoring

---

## 🎨 UI Features

- Modern Responsive Design
- Mobile First Layout
- Beautiful Hero Section
- Interactive Cards
- Smooth Animations
- Clean Navigation
- Professional Dashboard
- Reusable Components
- Consistent Design System

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Lucide React

---

## Backend

- FastAPI
- SQLAlchemy 2.0
- PostgreSQL
- Alembic
- JWT Authentication
- Pydantic v2
- Repository Pattern
- Service Layer Pattern

---

## Database

- PostgreSQL

---

## Tools

- Git
- GitHub
- VS Code
- Postman

---

# 📁 Project Structure

```
Bake-N-Bite/
│
├── backend/
│   ├── app/
│   ├── alembic/
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Bake-N-Bite.git
```

```bash
cd Bake-N-Bite
```

---

# Backend Setup

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Database Migration

```bash
alembic upgrade head
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

# Frontend Setup

```bash
cd frontend
```

Install Packages

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🔐 Environment Variables

## Backend (.env)

```
DATABASE_URL=

SECRET_KEY=

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

FRONTEND_URL=
```

---

## Frontend (.env)

```
VITE_API_URL=
```

---

# 📷 Screenshots

> Add screenshots here after deployment.

- Home Page
- Products
- Categories
- Cart
- Checkout
- Admin Dashboard

---

# 🚀 Future Improvements

- Online Payment Integration
- Razorpay Integration
- Email Notifications
- Push Notifications
- Coupons & Discounts
- Live Order Tracking
- Inventory Alerts
- Customer Loyalty Program
- AI Food Recommendation
- Progressive Web App (PWA)

---

# 📚 Learning Highlights

This project demonstrates practical implementation of:

- Full Stack Development
- REST API Design
- Authentication & Authorization
- Clean Architecture
- Repository Pattern
- Service Layer Pattern
- Responsive UI Design
- State Management
- Database Relationships
- CRUD Operations
- Protected Routes
- File Upload Handling

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Add New Feature"
```

4. Push to branch

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Harshit Kumar Singh**

LinkedIn: www.linkedin.com/in/harshit-kumar-singh04

Email: harshksingh2004@gmail.com

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.

---

# 📄 License

This project is licensed under the MIT License.
