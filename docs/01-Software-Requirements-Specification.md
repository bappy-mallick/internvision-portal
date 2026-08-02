# **Software Requirements Specification** 

## **Project Title** 

## **InternVision Portal** 

Version 1.0 

## **1. Project Overview** 

InternVision Portal is a full-stack web application developed for InternVision Tech to simplify course registration, internship applications, online payment processing, and administrative management. 

The platform provides two separate interfaces: 

- Public Portal 

- Admin Dashboard 

The public portal allows students to register for courses, complete online payments, and apply for internships. 

The admin dashboard enables administrators to securely monitor applications, track payments, and export records in Excel format. 

The system is designed to be responsive, scalable, secure, and easy to use. 

## **2. Objectives** 

The project aims to: 

- Digitize the student registration process 

- Collect internship applications 

- Integrate online payment 

- Provide a secure admin dashboard 

- Export data into Excel 

- Demonstrate full-stack development skills 

These objectives align with the assignment brief. 

## **3. Users** 

## **Public User** 

A visitor can 

- View course information 

- Register for a course 

- Make payment 

- Apply for internship 

Authentication is **not required** . 

## **Administrator** 

Administrator can 

- Login securely 

- View dashboard 

- View applicants 

- View payments 

- Export Excel reports 

## **4. Functional Requirements** 

## **4.1 Home Page** 

The landing page shall contain: 

- Hero Section 

- About Section 

- Course Registration 

- Internship Section 

- Footer 

- Contact Information 

## **4.2 Course Registration** 

Users shall be able to: 

- Enter Name 

- Email 

- Phone Number 

View a single featured course card containing: 

- Course title 

- Short description 

- Registration fee 

- Register button 

Upon clicking **Register** : 

- Fill out the registration form 

- Proceed to Razorpay Test Mode 

- Receive a success confirmation 

- Store registration and payment details 

## **4.3 Payment** 

The system shall: 

- Integrate Razorpay Test Mode 

- Verify successful payment 

- Store payment status 

- Generate payment record 

Only successful payments will appear as completed in the admin dashboard. 

## **4.4 Internship Application** 

Applicants shall submit: 

- Full Name 

- Email 

- Phone Number 

- College Name 

- Degree 

- Skills 

- Internship Duration 

Duration options: 

- 1 Month 

- 3 Months 

- 6 Months 

Submitted data shall be stored in Firebase. 

## **4.5 Admin Authentication** 

Administrator shall login using 

- Email 

- Password 

Only authenticated administrators can access the dashboard. 

## **4.6 Dashboard** 

Dashboard displays: 

- Total Applications 

- Total Payments 

- Total Revenue 

- Recent Applications 

- Recent Payments 

These statistics provide a quick overview while keeping the implementation lightweight. 

## **4.7 Applicants Module** 

Administrator can 

- View all applicants 

- Search applicants 

- View application details 

## **4.8 Payments Module** 

Administrator can 

- View payment history 

- View payment status 

- Search payments 

## **4.9 Excel Export** 

Administrator can export: 

- Applicant List (.xlsx) 

- Payment List (.xlsx) 

using Apache POI. 

## **4.10 Theme** 

Website supports: 

- Light Mode 

- Dark Mode 

using a toggle switch. 

## **5. Non-Functional Requirements** 

The application shall: 

## **Performance** 

- Load within 3 seconds on a standard broadband connection. 

- Handle multiple simultaneous users for this assignment. 

## **Security** 

- Passwords stored securely. 

- JWT authentication for admin. 

- Input validation on all forms. 

- Protected admin routes. 

## **Reliability** 

- Prevent duplicate submissions. 

- Handle invalid inputs gracefully. 

- Show user-friendly error messages. 

## **Usability** 

- Responsive across desktop, tablet, and mobile. 

- Clean, modern interface. 

- Simple navigation. 

## **Maintainability** 

- Modular codebase. 

- Layered backend architecture. 

- Reusable UI components. 

## **6. Assumptions** 

- Only one admin account is required. 

- Payment uses Razorpay Test Mode. 

- Public users do not require login. 

- Firebase Cloud Firestore stores application data. 

- Internet connection is available. 

## **7. Constraints** 

- Project must be completed within the assignment deadline. 

- Test payment gateway only. 

- Firebase free tier. 

- Public GitHub repository. 

- Live deployment required. 

## **8. Success Criteria** 

The project is considered complete when: 

- Course registration works. 

- Payment succeeds. 

- Internship application is stored. 

- Admin login functions. 

- Dashboard reflects real data. 

- Excel export works. 

- Website is deployed. 

- Source code is available on GitHub. 

- Documentation is complete. 

These criteria directly reflect the evaluation focus described in the PRD. 

