# 🍰 Bake N Bite

A full-stack food ordering web application for homemade food businesses. Customers can browse products, place orders, manage their profiles, and track orders, while administrators can manage products, categories, customers, and orders through a dedicated dashboard.

---

## 🚀 Features

### Customer
- User Authentication (JWT + Google OAuth)
- Browse Categories & Products
- Search & Filter Products
- Shopping Cart
- Checkout & Order Placement
- Order History
- Address Management
- Product Reviews
- Responsive Design

### Admin
- Dashboard & Analytics
- Product Management
- Category Management
- Order Management
- Customer Management
- Review Management
- Image Uploads (Cloudinary)

---

## 🛠 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic
- JWT Authentication

### Services
- Cloudinary
- Google OAuth
- Razorpay
- SMTP (Email)

---

## 📁 Project Structure

```
Bake-N-Bite/
│
├── backend/
├── frontend/
├── database/
├── docs/
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Bake-N-Bite.git
cd Bake-N-Bite
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

alembic upgrade head

uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

## 🔑 Environment Variables

Create the following files before running the project:

### Backend

```
backend/.env
```

Required variables:

```
DATABASE_URL=
SECRET_KEY=
GOOGLE_CLIENT_ID=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
```

### Frontend

```
frontend/.env
```

```
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

## 📚 What I Learned

- Building REST APIs with FastAPI
- Repository & Service Layer Architecture
- JWT Authentication & Authorization
- PostgreSQL & Alembic Migrations
- Redux Toolkit State Management
- Cloudinary Image Storage
- Responsive UI Development
- Payment Gateway Integration
- Full Stack Project Deployment

---

## 👨‍💻 Author

**Harshit Kumar Singh**

- LinkedIn: https://www.linkedin.com/in/harshit-kumar-singh04
- GitHub: https://github.com/harsh0475

---

## 📄 License

This project is licensed under the MIT License.