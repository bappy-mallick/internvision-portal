# **Database Design Document (DDD)** 

## **InternVision Portal** 

Version 1.0 

## **1. Database Overview** 

The application will use **Firebase Cloud Firestore** , a NoSQL document database. 

The database consists of **five collections** : 

Firestore 

│ 

├── admins 

├── courses 

├── registrations 

- ├── internshipApplications 

└── payments 

Each collection stores one type of entity, keeping the data organized and easy to query. 

## **2. Firestore Architecture** 

Firestore 

│ 

├── admins 

- │      └── adminId 

│ 

├── courses 

- │      └── courseId 

│ 

├── registrations 

- │      └── registrationId 

│ 

├── internshipApplications 

│      └── applicationId 

│ 

└── payments 

└── paymentId 

## **3. Collection: Admins** 

Purpose 

Store administrator login information. 

## **Fields** 

**Field Type Required Description** id String Yes Document ID name String Yes Admin Name email String Yes Login Email password String Yes BCrypt Hashed Password role String Yes ADMIN createdAt Timestamp Yes Creation Time 

Example 

{ 

"name":"Admin", 

"email":"admin@internvision.com", 

"password":"<bcrypt>", 

"role":"ADMIN", 

"createdAt":"timestamp" 

} 

**4. Collection: Courses** 

The PRD only requires **course registration** , so we'll keep a **single featured course** instead of building a catalog. This matches your preference and avoids unnecessary complexity. 

## **Fields** 

|**Field**|**Type**|**Required**|
|---|---|---|
|id|String|Yes|
|ttle|String|Yes|
|descripton|String|Yes|
|price|Number|Yes|
|duraton|String|Yes|
|isActve|Boolean|Yes|
|createdAt|Timestamp|Yes|



## Example 

{ 

"title":"Java Backend Development", 

"description":"Learn Java, Spring Boot, REST APIs and build backend applications.", 

"price":999, 

"duration":"8 Weeks", 

"isActive":true 

} 

## **5. Collection: Registrations** 

Purpose 

Stores students who register for the course. 

**Fields** 

**Field Type** id String 

|**Field**|**Type**|
|---|---|
|studentName|String|
|email|String|
|phone|String|
|courseId|String|
|paymentStatus|String|
|paymentId|String|
|registeredAt|Timestamp|



Payment Status 

## PENDING 

## SUCCESS 

|FAILED|
|---|
|Example|
|{|
|"studentName":"Rahul",|
|"email":"rahul@gmail.com",|
|"phone":"9876543210",|
|"courseId":"course001",|
|"paymentStatus":"SUCCESS",|
|"paymentId":"pay001"|
|}|



## **6. Collection: Internship Applications** 

## Purpose 

Store internship applicants. 

## **Fields** 

**Field Type** id String fullName String email String phone String college String degree String skills String duration String 

createdAt Timestamp 

Duration Values 

1 Month 

3 Months 

6 Months 

Example 

{ 

"fullName":"Rahul Sharma", 

"email":"rahul@gmail.com", 

"college":"JNCT", 

"degree":"B.Tech", 

"skills":"Java, Spring Boot", "duration":"3 Months" 

- } 

## **7. Collection: Payments** 

## Purpose 

Store Razorpay payment information. 

## **Fields** 

|**Field**|**Type**|
|---|---|
|id|String|
|registratonId|String|
|razorpayOrderId|String|
|razorpayPaymentId|String|
|amount|Number|
|currency|String|
|status|String|
|paidAt|Timestamp|



## Status 

PENDING 

## SUCCESS 

## FAILED 

## Example 

{ 

"registrationId":"reg001", 

"razorpayOrderId":"order_xyz", 

"razorpayPaymentId":"pay_xyz", 

"amount":999, 

"currency":"INR", 

"status":"SUCCESS" 

} 

## **8. Logical Relationships** 

Although Firestore is NoSQL, the collections are logically related: 

Course 

│ 

│ 

▼ 

Registration 

│ 

▼ 

Payment 

Internship Application 

│ 

└── Independent 

Admin 

│ 

▼ 

Dashboard 

## **9. Dashboard Data Sources** 

**Dashboard Card Source** 

Total Applications internshipApplications 

Total Registrations registrations 

Completed Payments payments 

Revenue payments (SUCCESS only) 

## **10. Firestore Query Plan** 

**Dashboard** 

Count Documents 

internshipApplications 

registrations 

payments 

## **Revenue** 

payments 

WHERE status = SUCCESS 

## **Applicant List** 

internshipApplications 

ORDER BY createdAt DESC 

## **Payments** 

payments 

ORDER BY paidAt DESC 

## **11. Validation Rules** 

## **Registration** 

- Name required 

- Email required 

- Valid phone number 

- Active course required 

**Internship** 

- Name required 

- Email required 

- College required 

- Degree required 

- Skills required 

- Duration required 

## **Payment** 

- Order ID required 

- Payment ID required 

- Amount > 0 

- Status required 

## **12. Firestore Indexes** 

Create indexes for: 

payments.status 

payments.paidAt 

internshipApplications.createdAt 

registrations.registeredAt 

These support the dashboard, filtering, and sorting without overcomplicating the database. 

## **13. Security Rules (High-Level)** 

- Public users: 

   - Can create registrations. 

   - Can create internship applications. 

- Admin: 

   - Can read all collections. 

   - Can export data. 

`o` Can update payment status after verification. 

Since the backend uses the Firebase Admin SDK, most security and validation will be enforced in Spring Boot rather than exposing Firestore directly. 

## **14. Database Summary** 

**Collection Purpose** admins Admin authentication courses Featured course information registrations Course registrations internshipApplications Internship applications payments Payment records 

