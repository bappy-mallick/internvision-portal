# **Folder Structure & Development Roadmap** 

## **Project** 

## **InternVision Portal** 

Version 1.0 

## **1. Overall Project Structure** 

internvision-portal/ 

│ 

├── frontend/ 

│ 

├── backend/ 

│ 

├── docs/ 

│ 

- ├── README.md 

│ 

- └── .gitignore 

## **2. Frontend Structure (Next.js)** 

frontend/ 

│ 

├── public/ 

│ 

├── src/ 

- │   │ 

- │   ├── app/ 

- │   │   │ 

- │   │   ├── page.tsx 

- │   │   ├── register/ 

- │   │   ├── internship/ 

- │   │   ├── payment-success/ 

- │   │   ├── login/ 

- │   │   ├── admin/ 

- │   │   │     ├── dashboard/ 

- │   │   │     ├── applications/ 

- │   │   │     ├── payments/ 

- │   │   │     └── export/ 

- │   │ 

- │   ├── components/ 

- │   │     ├── common/ 

- │   │     ├── layout/ 

- │   │     ├── forms/ 

- │   │     ├── dashboard/ 

- │   │     └── ui/ 

- │   │ 

- │   ├── services/ 

## │   │ 

- │   ├── hooks/ 

## │   │ 

- │   ├── types/ 

- │   │ 

- │   ├── utils/ 

- │   │ 

- │   ├── lib/ 

│   │ 

- │   └── styles/ 

│ 

- ├── package.json 

│ 

└── next.config.ts 

## **3. Backend Structure (Spring Boot)** 

backend/ 

│ 

- ├── src/main/java/ 

│ 

- │   └── com.internvision.portal/ 

│ 

- │         ├── config/ 

- │         ├── controller/ 

- │         ├── service/ 

- │         ├── service/impl/ 

- │         ├── repository/ 

- │         ├── model/ 

- │         ├── dto/ 

- │         ├── mapper/ 

- │         ├── security/ 

- │         ├── exception/ 

- │         ├── util/ 

- │         ├── firebase/ 

- │         └── InternVisionApplication.java 

│ 

├── resources/ 

│ 

- │     ├── application.properties 

│     └── firebase-service-account.json 

│ 

├── pom.xml 

│ 

└── Dockerfile 

## **4. Firebase Structure** 

Collections 

admins 

courses 

registrations 

internshipApplications 

## payments 

Exactly matching the database design from Step 3. 

## **5. Environment Variables** 

## **Frontend** 

NEXT_PUBLIC_API_BASE_URL= 

NEXT_PUBLIC_RAZORPAY_KEY= 

**Backend** 

JWT_SECRET= 

JWT_EXPIRATION= 

RAZORPAY_KEY_ID= 

RAZORPAY_KEY_SECRET= 

FIREBASE_PROJECT_ID= 

## **6. Build Order** 

## **Phase 1** 

Project setup 

- Spring Boot 

- Next.js 

- Firebase 

- GitHub 

- Tailwind 

- shadcn/ui 

## **Phase 2** 

Backend 

- Firebase Configuration 

- JWT 

- Admin Login 

- CRUD APIs 

## **Phase 3** 

## Frontend 

- Home Page 

- Registration 

- Internship Form 

## **Phase 4** 

## Payment 

- Razorpay 

- Verification API 

## **Phase 5** 

## Admin 

- Dashboard 

- Tables 

- Export Excel 

## **Phase 6** 

## Deployment 

- Backend 

- Frontend 

## **Phase 7** 

## Testing 

- API Testing 

- UI Testing 

- Responsive Testing 

## **7. Feature Checklist** 

## **Public Website** 

- Landing Page 

- Featured Course 

- Registration Form 

- Payment Gateway 

- Internship Form 

## **Backend** 

- JWT Authentication 

- REST APIs 

- Firebase Integration 

- Validation 

- Error Handling 

## **Admin** 

- Login 

- Dashboard 

- Applications 

- Payments 

- Export 

## **Deployment** 

- Frontend Live 

- Backend Live 

- Firebase Connected 

## **8. Development Priority** 

Instead of building page-by-page, build feature-by-feature: 

## **Priority 1** 

Authentication 

↓ 

## **Priority 2** 

Course Registration 

↓ 

## **Priority 3** 

Payment 

↓ 

**Priority 4** 

Internship 

↓ 

**Priority 5** 

Dashboard 

↓ 

**Priority 6** 

Export 

This order ensures core functionality is working early. 

## **9. Suggested Git Workflow** 

Use simple, descriptive commits such as: 

Initial project setup 

Add authentication 

Implement course registration 

Integrate Razorpay 

Build internship application 

Develop admin dashboard 

Add Excel export 

Deploy application 

This creates a clean commit history without slowing you down. 

## **10. Documentation** 

Your README.md should include: 

- Project Overview 

- Features 

- Tech Stack 

- Folder Structure 

- Installation 

- Environment Variables 

- API Endpoints 

- Deployment 

- Admin Credentials (for reviewer) 

## **11. Testing Checklist** 

Before submission, verify: 

## **Public** 

- Home page loads 

- Registration works 

- Payment completes (test mode) 

- Internship application saves 

## **Admin** 

- Login works 

- Dashboard data updates 

- Applications display correctly 

- Payments display correctly 

- Excel export downloads valid .xlsx files 

## **Deployment** 

- Frontend accessible 

- Backend APIs reachable 

- Firebase connected 

- No console errors 

## **12. Final Submission Checklist** 

The submission email should include: 

- GitHub repository link 

- Live website URL 

- README/documentation 

- Admin test credentials 

This matches the PRD's required deliverables. 

