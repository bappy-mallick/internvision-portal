# InternVision Portal

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-25-orange.svg)](https://www.oracle.com/java/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-ffca28.svg)](https://firebase.google.com/)

---

## 📌 Overview

**InternVision Portal** is a production-quality 3-tier full-stack web application built for **InternVision Tech**. It digitizes course registration, internship applications, Razorpay online payments, and administrative management.

The system is split into two distinct user surfaces:
1. **Public Student Portal** — No login required. View featured course, register online with Razorpay, and apply for internships (1, 3, or 6 months).
2. **Secure Admin Dashboard** — Protected by JWT authentication (`Authorization: Bearer <token>`). Features real-time statistics, paginated application and payment tables with search/filter, and instant Microsoft Excel (`.xlsx`) report exports generated using Apache POI.

---

## 🚀 Technology Stack

### Backend
- **Framework:** Spring Boot 3.3.2
- **Language:** Java 25
- **Security:** Spring Security, JWT (JJWT `0.12.6`), BCrypt Password Hashing
- **Database:** Firebase Cloud Firestore (via Firebase Admin SDK `9.2.0`)
- **Payment Gateway:** Razorpay Java SDK (`1.4.5`) & HMAC-SHA256 signature verification
- **Reporting:** Apache POI (`5.2.5`) for Excel export
- **Build Tool:** Maven

### Frontend
- **Framework:** Next.js 15 (App Router, React 19)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v3 & shadcn/ui primitives
- **Theme:** Light / Dark Mode toggle (via `next-themes` & CSS custom properties)
- **HTTP Client:** Axios (with request interceptor for JWT authorization)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

---

## 🔑 Admin Test Credentials (For Reviewer)

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@internvision.com` | `Admin@123` |

> *Note: The default admin account and featured course are automatically seeded into Firestore on backend startup if they do not exist.*

---

## 📁 Repository Structure

```
InternVision Portal/
├── backend/                        # Spring Boot 3 / Java 25 REST API
│   ├── src/main/java/com/internvision/portal/
│   │   ├── config/                 # FirebaseConfig, SecurityConfig, CorsConfig
│   │   ├── controller/             # Auth, Course, Registration, Payment, Internship, Admin, Export
│   │   ├── service/                # Business logic interfaces & implementations
│   │   ├── repository/             # Firestore document repositories
│   │   ├── model/                  # Domain POJOs (Admin, Course, Registration, Application, Payment)
│   │   ├── dto/                    # Request/Response DTOs & ApiResponse wrapper
│   │   ├── security/               # JwtAuthFilter, JwtUtil
│   │   ├── exception/              # GlobalExceptionHandler & custom exceptions
│   │   ├── util/                   # RazorpayUtil (HMAC SHA-256), DataSeeder
│   │   └── firebase/               # Generic FirestoreService helper
│   ├── src/main/resources/
│   │   ├── application.properties  # Environment variable driven config
│   │   └── firebase-service-account.json # Firebase service account placeholder
│   ├── pom.xml
│   └── Dockerfile                  # Multi-stage container build
├── frontend/                       # Next.js 15 App Router Frontend
│   ├── src/
│   │   ├── app/                    # Pages: /, /register, /payment-success, /internship, /login, /admin/*
│   │   ├── components/             # ui/, layout/, forms/, dashboard/, common/
│   │   ├── services/               # API clients (auth, course, registration, payment, internship, admin)
│   │   ├── hooks/                  # useAuth custom hook
│   │   ├── lib/                    # api.ts (Axios client) & utils.ts (cn)
│   │   ├── types/                  # TypeScript definitions
│   │   └── styles/                 # globals.css (Design system tokens & themes)
│   ├── package.json
│   ├── tailwind.config.ts
│   └── vercel.json
└── docs/                           # Software Requirements & Architecture Specifications
```

---

## 🛠️ Local Installation & Setup Guide

### 1. Prerequisites
- **JDK 25** (or JDK 21+)
- **Node.js 18+** and npm
- **Firebase Account** (Cloud Firestore enabled)
- **Razorpay Account** (Test Key ID and Secret)

---

### 2. Firebase Cloud Firestore Setup

1. Open the [Firebase Console](https://console.firebase.google.com).
2. Create a new Firebase project (e.g., `internvision-portal`).
3. Go to **Build > Firestore Database** and click **Create Database** (Select production mode and default region).
4. Go to **Project Settings > Service Accounts**.
5. Click **Generate new private key** to download your `firebase-service-account.json`.
6. **Local Setup:** Place the downloaded JSON file at:
   `backend/src/main/resources/firebase-service-account.json`
7. **Cloud / Render Setup:** Alternatively, paste the JSON content as a single line into the `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable.

---

### 3. Backend Setup (Spring Boot)

```bash
cd backend

# Option A: Create your local .env file
cp .env.example .env

# Configure your environment variables inside .env:
# JWT_SECRET=your_32_character_secret_key
# RAZORPAY_KEY_ID=rzp_test_xxxx
# RAZORPAY_KEY_SECRET=xxxx
# FIREBASE_PROJECT_ID=your_firebase_project_id

# Compile and run Spring Boot
mvn spring-boot:run
```
> The backend runs on `http://localhost:8080`.

---

### 4. Frontend Setup (Next.js)

```bash
cd frontend

# Install Node dependencies
npm install

# Copy environment variable template
cp .env.local.example .env.local

# Configure .env.local:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
# NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxx

# Start development server
npm run dev
```
> The frontend runs on `http://localhost:3000`.

---

## 🌐 REST API Endpoints Summary

All APIs return a consistent JSON response format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Public Endpoints (No Auth)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/course` | Returns featured course info |
| `POST` | `/api/v1/registrations` | Register student & create Razorpay order |
| `POST` | `/api/v1/payments/verify` | Verify Razorpay HMAC signature & update status |
| `POST` | `/api/v1/internships` | Submit internship application |
| `POST` | `/api/v1/auth/login` | Admin login → returns JWT token |

### Protected Admin Endpoints (`Authorization: Bearer <JWT>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/dashboard` | Dashboard analytics (apps, regs, payments, revenue) |
| `GET` | `/api/v1/admin/applications` | Paginated applicant list (`?page=1&size=10&search=`) |
| `GET` | `/api/v1/admin/applications/{id}` | Single applicant detail |
| `GET` | `/api/v1/admin/payments` | Paginated payment history (`?page=1&size=10&status=`) |
| `GET` | `/api/v1/admin/payments/{id}` | Single payment detail |
| `GET` | `/api/v1/admin/export/applications` | Download `Applicants.xlsx` Excel report |
| `GET` | `/api/v1/admin/export/payments` | Download `Payments.xlsx` Excel report |

---

## ☁️ Deployment Guide

### Deploying Frontend to Vercel
1. Push repository to GitHub.
2. Import the `frontend` folder into [Vercel](https://vercel.com).
3. Set Framework Preset to **Next.js**.
4. Add environment variables:
   - `NEXT_PUBLIC_API_BASE_URL` = `https://your-backend.onrender.com`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = `rzp_test_xxxx`

### Deploying Backend to Render
1. Create a new Web Service on [Render](https://render.com).
2. Point to the `backend` folder and choose **Docker** runtime (using included `Dockerfile`).
3. Set environment variables:
   - `PORT` = `8080`
   - `JWT_SECRET` = `your_secure_256bit_secret`
   - `RAZORPAY_KEY_ID` = `rzp_test_xxxx`
   - `RAZORPAY_KEY_SECRET` = `xxxx`
   - `FIREBASE_PROJECT_ID` = `your_firebase_project_id`
   - `FIREBASE_SERVICE_ACCOUNT_JSON` = `{...full_json_content...}`
   - `CORS_ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`

---

## 📜 License & Acknowledgments

Developed as part of the InternVision Tech Pre-Hire Project Assignment. Built in accordance with industry-standard clean architecture guidelines.