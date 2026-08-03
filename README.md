# InternVision Portal

[![Production Deployment](https://img.shields.io/badge/Vercel-Live_App-000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://internvision-portal.vercel.app/)
[![Backend Status](https://img.shields.io/badge/Render-Live_API-46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)](https://internvision-portal.onrender.com)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.5-6DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-25-ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.12-000000.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38BDF8.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## 📌 Project Overview

**InternVision Portal** is an enterprise-grade, production-deployed 3-tier full-stack application engineered for **InternVision Tech**. The system digitizes course registration workflows, internship application pipelines, secure online payment verification via Razorpay, and administrative backend management with automated data exports.

Architected with a decoupled modular approach, the application features:
1. **Public Student Surface**: An intuitive, fully responsive interface allowing prospective students to explore featured courses, register with instant online payment checkout, apply for structured internships (1, 3, or 6 months duration), and access developer resources.
2. **Protected Admin Portal**: A secure dashboard accessible only via JWT authentication (`Authorization: Bearer <token>`). Enables real-time metrics monitoring, paginated student application and payment log inspection with live search/filtering, and instant Microsoft Excel (`.xlsx`) reporting generated server-side using Apache POI.

---

## 🌐 Live Production URLs

- 🚀 **Frontend Web Application (Vercel):** [https://internvision-portal.vercel.app/](https://internvision-portal.vercel.app/)
- ⚡ **Backend REST API (Render):** [https://internvision-portal.onrender.com](https://internvision-portal.onrender.com)

> **Architecture Note:** The Next.js frontend deployed on Vercel communicates seamlessly with the Java 25 Spring Boot backend service deployed on Render using CORS-restricted RESTful APIs.

---

## ✨ Features

- **Course Registration**: Streamlined course enrollment interface integrated with Razorpay order creation and automatic status updates.
- **Internship Application**: Multi-tier internship application submission workflow supporting 1, 3, and 6-month domain specializations.
- **Admin Dashboard**: Interactive administrative control center with analytics cards (total applicants, registrations, verified payments, revenue) and dynamic data tables.
- **JWT Authentication**: Secure stateless session handling for administrative routes powered by Spring Security, JJWT (HMAC SHA-256), and BCrypt hashing.
- **Firebase Firestore Integration**: Cloud-native NoSQL persistence layer using Firebase Admin SDK with custom Firestore collection repositories.
- **Razorpay Payment Verification**: Secure end-to-end payment processing featuring server-side HMAC-SHA256 signature verification to eliminate tampering.
- **Microsoft Excel Data Export**: On-demand generation and streaming of `.xlsx` tabular reports for applications and payments via Apache POI.
- **Responsive UI & Dark Mode**: Modern design built using Tailwind CSS, Radix UI primitives, and `next-themes` dark mode toggle with custom CSS tokens.
- **About Page & Resume Download**: Dedicated developer profile page showcasing technical skills, career achievements, and direct resume download.
- **Production-Ready Security & Reliability**: CORS origin filtering, global exception handling, robust request validation, data seeding, and Docker containerization.

---

## 🛠️ Technology Stack

| Domain | Technology | Version / Tooling | Details |
|---|---|---|---|
| **Language (Backend)** | Java | Java 25 | Latest JDK release with modern syntax & performance |
| **Framework (Backend)** | Spring Boot | 3.5.5 | Spring MVC, Spring Security, Bean Validation |
| **Security & Auth** | Spring Security / JJWT | JJWT 0.12.6 | JWT token issuance, validation, BCrypt password hashing |
| **Database** | Firebase Cloud Firestore | Admin SDK 9.4.3 | Cloud-native NoSQL document storage & real-time querying |
| **Payment Gateway** | Razorpay SDK | 1.4.5 | Order creation, webhook payload handling & HMAC verification |
| **Reporting Engine** | Apache POI | 5.2.5 | Server-side Excel (`.xlsx`) workbook generation & streaming |
| **Build & Container** | Maven / Docker | Multi-stage Dockerfile | Containerized JVM runtime on Debian Temurin 25 JRE |
| **Framework (Frontend)**| Next.js | 16.2.12 (App Router) | React 19, Server & Client Components, TypeScript 5.7 |
| **Styling & UI** | Tailwind CSS / Radix UI | 3.4.17 | CSS custom properties, shadcn/ui primitives, Lucide icons |
| **State & Theme** | Next Themes / React Hot Toast | 0.4.6 | Dark/Light mode persistence, asynchronous toast alerts |
| **HTTP Client** | Axios | 1.19.0 | Centralized Axios instance with request/response interceptors |
| **Deployment (Web)** | Vercel | Production | Automatic CI/CD build & global CDN edge hosting |
| **Deployment (API)** | Render | Production (Docker) | Containerized cloud deployment with environment variables |

---

## 🔐 Admin Test Credentials (For Reviewers)

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@internvision.com` | `Admin@123` |

> *Note: On backend startup, the `DataSeeder` utility automatically verifies and seeds the default administrator credentials and featured course into Firestore if they do not exist.*

---

## 🔑 Environment Variables Configuration

### Backend Environment Variables (`backend/.env` / Render Settings)

```env
# Server Port
PORT=8080

# JWT Configuration (Minimum 256-bit / 32-character secret)
JWT_SECRET=REPLACE_WITH_YOUR_SECURE_256_BIT_SECRET_KEY
JWT_EXPIRATION=86400000

# Firebase Cloud Firestore Configuration
FIREBASE_PROJECT_ID=REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID
FIREBASE_CREDENTIALS_PATH=classpath:firebase-service-account.json
# For Render Cloud Deployment (Paste full single-line JSON string):
# FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}

# Razorpay Payment Gateway (Test Mode)
RAZORPAY_KEY_ID=rzp_test_REPLACE_WITH_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=REPLACE_WITH_YOUR_KEY_SECRET

# CORS Configuration (Comma-separated allowed origins)
CORS_ALLOWED_ORIGINS=https://internvision-portal.vercel.app,http://localhost:3000
```

### Frontend Environment Variables (`frontend/.env.local` / Vercel Settings)

```env
# Spring Boot REST API Base URL
NEXT_PUBLIC_API_URL=https://internvision-portal.onrender.com/api/v1

# Razorpay Public Key ID
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_REPLACE_WITH_YOUR_KEY_ID
```

---

## 📂 Project Architecture & Folder Structure

```
InternVision Portal/
├── backend/                                  # Spring Boot REST API Application
│   ├── src/main/java/com/internvision/portal/
│   │   ├── config/                           # FirebaseConfig, SecurityConfig, CorsConfig
│   │   ├── controller/                       # Auth, Course, Registration, Payment, Internship, Admin, Export
│   │   ├── dto/                              # Request/Response DTOs & ApiResponse wrapper
│   │   ├── exception/                        # GlobalExceptionHandler & Custom Domain Exceptions
│   │   ├── firebase/                         # Generic FirestoreService CRUD helper
│   │   ├── mapper/                           # Entity-to-DTO conversion mappers
│   │   ├── model/                            # Admin, Course, Registration, InternshipApplication, Payment
│   │   ├── repository/                       # Firestore Collection Repositories
│   │   ├── security/                         # JwtAuthFilter, JwtUtil, CustomUserDetailsService
│   │   ├── service/                          # Service interfaces & implementation classes
│   │   └── util/                             # RazorpayUtil (HMAC verification), DataSeeder
│   ├── src/main/resources/
│   │   ├── application.properties            # Environment variable bound application configuration
│   │   └── firebase-service-account.json     # Local Firebase service account credential
│   ├── Dockerfile                            # Multi-stage container build (Java 25)
│   ├── pom.xml                               # Maven project dependencies & build configuration
│   └── .env.example                          # Backend environment variables template
├── frontend/                                 # Next.js 16 App Router Frontend
│   ├── src/
│   │   ├── app/                              # App pages: /, /register, /payment-success, /internship, /login, /about, /admin/*
│   │   ├── components/                       # UI components (common, dashboard, forms, layout, ui)
│   │   ├── hooks/                            # Custom React hooks (useAuth)
│   │   ├── lib/                              # Axios client (api.ts) & Tailwind utils (utils.ts)
│   │   ├── services/                         # API service layer (auth, course, registration, payment, internship, admin)
│   │   ├── styles/                           # Global CSS & theme design tokens (globals.css)
│   │   └── types/                            # TypeScript interfaces & API types
│   ├── public/                               # Static assets (profilepic.png, resume PDF)
│   ├── package.json                          # Node.js dependencies & scripts
│   ├── tailwind.config.ts                    # Tailwind CSS configuration
│   ├── vercel.json                           # Vercel deployment configuration
│   └── .env.local.example                    # Frontend environment variables template
└── docs/                                     # Software Architecture & Specification Documentation
```

---

## ⚡ REST API Endpoints Summary

All backend REST APIs produce consistent JSON response payloads formatted as:
```json
{
  "success": true,
  "message": "Operation executed successfully",
  "data": {}
}
```

### Public Endpoints (No Authentication Required)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/course` | Fetch active featured course details |
| `POST` | `/api/v1/registrations` | Submit student course registration & initiate Razorpay order |
| `POST` | `/api/v1/payments/verify` | Verify Razorpay HMAC-SHA256 signature & update payment status |
| `POST` | `/api/v1/internships` | Submit new internship application |
| `POST` | `/api/v1/auth/login` | Authenticate admin user & generate JWT Bearer token |

### Protected Admin Endpoints (`Authorization: Bearer <JWT>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/dashboard` | Fetch dashboard analytics metrics (applications, registrations, payments, revenue) |
| `GET` | `/api/v1/admin/applications` | Retrieve paginated internship applications (`?page=1&size=10&search=`) |
| `GET` | `/api/v1/admin/applications/{id}` | Fetch detailed view of a specific application |
| `GET` | `/api/v1/admin/payments` | Retrieve paginated payment records (`?page=1&size=10&status=`) |
| `GET` | `/api/v1/admin/payments/{id}` | Fetch detailed record of a specific payment transaction |
| `GET` | `/api/v1/admin/export/applications` | Download `Applicants.xlsx` Microsoft Excel report |
| `GET` | `/api/v1/admin/export/payments` | Download `Payments.xlsx` Microsoft Excel report |

---

## 🚀 Local Setup & Installation Guide

### Prerequisites
- **JDK 25** (or JDK 21+)
- **Node.js 18+** and `npm`
- **Firebase Project** with Cloud Firestore enabled
- **Razorpay Account** (Test Key ID & Secret)

---

### Step 1: Clone Repository
```bash
git clone https://github.com/bappy-mallick/internvision-portal.git
cd internvision-portal
```

---

### Step 2: Backend Setup (Spring Boot)
```bash
cd backend

# Copy environment variable template
cp .env.example .env

# Edit .env with your local credentials:
# JWT_SECRET=your_32_character_secret_key
# RAZORPAY_KEY_ID=rzp_test_xxxx
# RAZORPAY_KEY_SECRET=xxxx
# FIREBASE_PROJECT_ID=your_firebase_project_id

# Run the Spring Boot backend
mvn spring-boot:run
```
> The Spring Boot backend server will start on `http://localhost:8080`.

---

### Step 3: Frontend Setup (Next.js)
```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment variable template
cp .env.local.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
# NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxx

# Start the Next.js development server
npm run dev
```
> The Next.js frontend application will start on `http://localhost:3000`.

---

## 🛡️ Security & Reliability Features

- **Stateless JWT Security**: Protected administrative endpoints guarded by custom `JwtAuthFilter` and Spring Security context validation.
- **HMAC-SHA256 Signature Verification**: Server-side validation of Razorpay `payment_id`, `order_id`, and `signature` to prevent fraudulent payment confirmations.
- **CORS Protection**: Restricted Cross-Origin Resource Sharing policy enforcing allowed frontend origins.
- **Input Validation**: Strict request body validation using Spring Boot Starter Validation annotations (`@NotBlank`, `@Email`, `@Pattern`).
- **Global Error Interception**: `@RestControllerAdvice` global exception handler mapping custom domain exceptions into sanitized JSON error payloads.
- **BCrypt Password Encoding**: Secure password hashing for admin credentials using Spring Security's `BCryptPasswordEncoder`.

---

## ☁️ Deployment Architecture

### Frontend Deployment (Vercel)
- Integrated directly with GitHub repository root (`frontend/` directory).
- Configured via `vercel.json` with Next.js framework preset.
- Environment variables configured in Vercel project dashboard (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`).

### Backend Deployment (Render)
- Deployed as a web service using multi-stage `Dockerfile` (`openjdk:25-ea-jdk-slim` build stage and `eclipse-temurin:25-jre` runtime stage).
- Configured environment variables injected securely via Render Environment Dashboard including single-line JSON string for `FIREBASE_SERVICE_ACCOUNT_JSON`.

---

## 🔮 Future Improvements

- [ ] Add automated email notification service (SendGrid/JavaMail) for registration and application confirmations.
- [ ] Implement multi-role administrative access (Super Admin, Coordinator, Finance Viewer).
- [ ] Expand student dashboard for real-time application status tracking and certificate downloads.
- [ ] Integrate webhooks for asynchronous Razorpay payment event processing.

---

## 👨‍💻 Author

**Bappy Mallick**  
*Backend Developer & Java Full Stack Engineer*

- 📁 **GitHub:** [github.com/bappy-mallick](https://github.com/bappy-mallick)
- 💼 **LinkedIn:** [linkedin.com/in/bappymallick](https://linkedin.com/in/bappymallick)
- ✉️ **Email:** [bappymallick2410@gmail.com](mailto:bappymallick2410@gmail.com)

---

## 📜 License

This project is open-source and developed for the **InternVision Tech** engineering evaluation assignment. Built adhering to industry-standard architectural best practices.