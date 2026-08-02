# **REST API Specification** 

## **Project** 

## **InternVision Portal** 

**Version:** 1.0 

## **1. API Overview** 

**Base URL** 

/api/v1 

## **Authentication** 

**Module Authentication** 

Public APIs No 

Admin APIs JWT Token 

## **Response Format** 

## **Success** 

{ 

"success": true, 

"message": "Operation successful", 

"data": {} 

} 

## **Error** 

{ 

"success": false, 

"message": "Something went wrong", 

"errors": [] 

} 

## **2. Course APIs** 

## **Get Featured Course** 

## **Endpoint** 

GET /api/v1/course 

## **Description** 

Returns the featured course displayed on the homepage. 

## **Response** 

{ "success": true, "data": { "id": "course001", "title": "Java Backend Development", "description": "...", "price": 999, "duration": "8 Weeks" } } 

## **3. Course Registration APIs** 

## **Register for Course** 

POST /api/v1/registrations 

## **Request** 

{ 

"studentName":"Bappy Mallick", 

"email":"bappy@gmail.com", 

"phone":"9876543210", 

"courseId":"course001" 

} 

## **Process** 

Validate Request 

↓ 

Save Registration 

↓ 

Create Razorpay Order 

↓ 

Return Order Details 

## **Response** 

{ 

"success": true, 

"data": { 

"registrationId":"reg001", 

"orderId":"order_xyz", 

"amount":99900 

} 

} 

## **4. Payment APIs** 

## **Verify Payment** 

POST /api/v1/payments/verify 

## **Request** 

## { 

"registrationId":"reg001", 

"razorpayOrderId":"order_xyz", 

"razorpayPaymentId":"pay_xyz", 

"razorpaySignature":"signature" 

## } 

## **Backend Flow** 

Verify Signature 

## ↓ 

Payment Success? 

↓ 

Update Payment 

## ↓ 

Update Registration 

## ↓ 

Return Success 

## **Response** 

## { 

"success": true, 

"message":"Payment Successful" 

} 

## **5. Internship APIs** 

## **Submit Application** 

POST /api/v1/internships 

## **Request** 

{ 

"fullName":"Bappy Mallick", 

"email":"bappy@gmail.com", 

"phone":"9876543210", 

"college":"JNCT", 

"degree":"B.Tech", 

"skills":"Java, Spring Boot", 

"duration":"3 Months" 

} 

## **Response** 

{ 

"success": true, 

"message":"Application Submitted" 

} 

## **6. Authentication APIs** 

## **Admin Login** 

POST /api/v1/auth/login 

## **Request** 

{ 

"email":"admin@internvision.com", 

"password":"password123" 

} 

## **Response** 

{ 

"success": true, 

"data":{ 

"token":"jwt-token" 

} 

} 

## **7. Dashboard APIs** 

## **Dashboard Summary** 

GET /api/v1/admin/dashboard 

Authentication 

JWT Required 

## **Response** 

{ 

"success":true, 

"data":{ 

"totalApplications":120, 

"totalRegistrations":90, 

"completedPayments":80, 

"totalRevenue":79920 

} 

} 

## **8. Applicant APIs** 

## **Get Applicants** 

GET /api/v1/admin/applications 

## **Query Parameters** 

?page=1 

&size=10 

&search= 

## **Response** 

{ 

"success":true, 

"data":[] 

} 

## **Get Applicant Details** 

GET /api/v1/admin/applications/{id} 

## **9. Payment APIs** 

## **Get Payments** 

GET /api/v1/admin/payments 

## **Query Parameters** 

?page=1 

&size=10 

&status=SUCCESS 

## **Payment Details** 

GET /api/v1/admin/payments/{id} 

## **10. Excel Export APIs** 

## **Export Applicants** 

GET /api/v1/admin/export/applications 

## **Response** 

Applicants.xlsx 

## **Export Payments** 

GET /api/v1/admin/export/payments 

## **Response** 

Payments.xlsx 

## **11. Status Codes** 

## **Code Meaning** 

200 Success 

- 201 Created 

- 400 Validation Error 

- 401 Unauthorized 

- 403 Forbidden 

- 404 Not Found 

- 409 Duplicate 

- 500 Server Error 

## **12. Validation Rules** 

## **Registration** 

- Name required 

- Email format 

- Phone number (10 digits) 

- Course ID required 

## **Internship** 

- Name required 

- Email required 

- College required 

- Degree required 

- Skills required 

- Duration must be one of: `o` 1 Month 

   - 3 Months 

   - 6 Months 

## **Login** 

- Email required 

- Password required 

## **13. API Security** 

Protected endpoints require: 

Authorization 

Bearer <JWT> 

Protected routes: 

/api/v1/admin/** 

/api/v1/export/** 

Public routes: 

/api/v1/course 

/api/v1/registrations 

/api/v1/payments/verify 

/api/v1/internships 

/api/v1/auth/login 

## **14. Complete API List** 

|**Module**|**Method**|**Endpoint**|
|---|---|---|
|Featured Course|GET|/api/v1/course|
|Course Registraton|POST|/api/v1/registratons|
|Verify Payment|POST|/api/v1/payments/verify|
|Internship Applicaton|POST|/api/v1/internships|
|Admin Login|POST|/api/v1/auth/login|
|Dashboard|GET|/api/v1/admin/dashboard|
|Applicants|GET|/api/v1/admin/applicatons|
|Applicant Details|GET|/api/v1/admin/applicatons/{id}|
|Payments|GET|/api/v1/admin/payments|
|Payment Details|GET|/api/v1/admin/payments/{id}|
|Export Applicants|GET|/api/v1/admin/export/applicatons|
|Export Payments|GET|/api/v1/admin/export/payments|



