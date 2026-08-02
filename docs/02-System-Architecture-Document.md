# **System Architecture Document (SAD)** 

## **InternVision Portal** 

Version 1.0 

## **1. System Overview** 

InternVision Portal is a **3-tier Full-Stack Web Application** consisting of: 

Client (Browser) 

│ 

│ HTTPS 

▼ 

Next.js Frontend (Vercel) 

│ 

REST API Requests 

│ 

▼ 

Spring Boot Backend (Render) 

│ 

Firebase Admin SDK 

│ 

▼ 

Firebase Cloud Firestore 

The frontend never communicates directly with Firebase. All business logic, validation, authentication, payment verification, and database operations are handled by the Spring Boot backend. 

## **2. High-Level Architecture** 

USER 

│ 

▼ 

┌─────────────────────┐ 

│  Next.js Frontend   │ 

└─────────────────────┘ 

▼ 

┌──────────────────────┐ 

│ Spring Boot Backend  │ 

└──────────────────────┘ │      │        │ │      │        │ ▼ ▼ ▼ 

Firebase   Razorpay   Excel Export 

Firestore  Test API   (Apache POI) 

## **3. Application Layers** 

## **Frontend Layer** 

Responsible for: 

- Rendering pages 

- Form validation 

- API communication 

- Theme switching 

- Displaying success/error messages 

Technology: 

- Next.js 

- TypeScript 

- Tailwind CSS 

- shadcn/ui 

## **Backend Layer** 

Responsible for: 

- Business logic 

- Validation 

- Authentication 

- Payment verification 

- Excel generation 

- CRUD operations 

- Security 

Technology: 

- Spring Boot 

- Spring Security 

- JWT 

- Firebase Admin SDK 

## **Database Layer** 

Stores: 

- Course Registrations 

- Internship Applications 

- Payment Records 

- Admin Users 

Technology: 

- Firebase Cloud Firestore 

## **4. Application Modules** 

## **Module 1** 

## **Public Website** 

## Responsibilities 

- Landing Page 

- Course Information 

- Registration 

- Contact 

**Module 2** 

## **Course Registration** 

Flow Student 

↓ 

Registration Form 

↓ 

Backend Validation 

↓ 

Create Pending Registration ↓ 

Return Razorpay Order 

## **Module 3** 

## **Payment** 

Flow Student 

↓ 

Razorpay Checkout 

↓ 

Payment Success 

↓ 

Backend Verification 

↓ 

Update Payment 

↓ 

Confirmation 

## **Module 4** 

## **Internship Application** 

Flow 

Student 

↓ 

Application Form 

↓ 

Validation 

↓ 

Save Application 

## ↓ 

## Success Message 

## **Module 5** 

## **Authentication** 

Flow 

Admin Login 

↓ 

Email + Password 

↓ 

Spring Security 

↓ 

JWT Token 

- ↓ 

Dashboard Access 

## **Module 6** 

## **Dashboard** 

Displays 

- Applications 

- Payments 

- Revenue 

- Recent Activity 

## **Module 7** 

**Excel Export** 

Admin 

↓ 

Click Export 

↓ 

Backend 

↓ 

Apache POI 

↓ 

.xlsx Download 

## **5. Data Flow** 

## **Course Registration** 

User 

↓ 

Frontend Form 

↓ 

Spring Boot 

↓ 

Firebase 

↓ 

Registration Created 

↓ 

Razorpay 

↓ 

Payment Success 

↓ 

Firebase Update 

## **Internship Flow** 

User 

↓ 

Application Form 

↓ 

Backend Validation 

↓ 

Firebase 

↓ 

Success 

## **Admin Flow** 

Admin 

↓ 

Login 

↓ 

JWT 

↓ 

Dashboard 

↓ 

Read Firebase 

↓ 

Statistics 

## **6. Security Architecture** 

Authentication 

- JWT Token 

- Password Hashing (BCrypt) 

Authorization 

Protected Routes 

/admin/** 

↓ 

Authenticated Only 

Public Routes 

/ 

/courses 

/register 

- /internship 

No authentication required. 

## **7. API Communication** 

All communication uses JSON. 

Example 

Frontend 

↓ 

POST /api/register 

↓ 

Spring Boot 

↓ 

JSON Response 

↓ 

Frontend UI 

Response Format 

{ 

"success": true, 

"message": "Registration completed", 

"data": {} 

} 

Error Format 

"success": false, 

- "message": "Invalid request" 

## **8. Folder-Level Architecture** 

## **Frontend** 

src/ 

│ 

├── app/ 

- │   ├── page.tsx 

- │   ├── register/ 

│   ├── internship/ 

│   ├── admin/ 

│   └── login/ 

│ 

├── components/ 

│ 

├── services/ 

│ 

├── hooks/ 

│ 

├── lib/ 

│ 

└── types/ 

## **Backend** 

src/main/java/ 

controller/ 

service/ 

repository/ 

model/ 

dto/ 

config/ 

security/ 

util/ 

exception/ 

This follows a clean layered architecture, making the code easier to maintain and explain during the interview. 

## **9. Deployment Architecture** 

Frontend 

↓ 

Vercel 

↓ 

REST API 

↓ 

Render 

↓ 

Firebase 

↓ 

Razorpay 

## **10. Error Handling Strategy** 

## Frontend 

- Toast notifications 

- Loading indicators 

- Form validation 

- Friendly error messages 

## Backend 

- Global Exception Handler 

- Validation errors 

- Authentication errors 

- Payment verification failures 

- Database exceptions 

## **11. Logging Strategy** 

Backend logs 

- User registrations 

- Internship applications 

- Admin login attempts 

- Payment verification 

- Export actions 

- System errors 

## **12. Scalability Considerations** 

Although this assignment is intended for evaluation, the architecture is designed to accommodate future growth: 

- Modular Spring Boot services 

- Stateless REST APIs 

- Firebase Cloud Firestore for scalable document storage 

- Component-based Next.js frontend 

- Reusable UI components 

- Environment-based configuration for deployments 

## **13. Architecture Decisions** 

## **Decision Reason** 

Spring Boot Backend Matches your backend expertise and resume 

Next.js Frontend Fast development with modern UI support 

Firebase Firestore Quick setup and flexible document model 

Razorpay Test Mode Meets the payment requirement with no real transactions 

JWT Authentication Secure, lightweight admin authentication 

Apache POI Standard Java library for generating Excel files 

