# UI/UX Specification

## Project

## InternVision Portal

Version 1.0

- 1. Design Philosophy

The UI should reflect a modern SaaS platform that is:

- Clean

- Professional

- Minimal

- Responsive

- Accessible

- Fast

The design should prioritize clarity over decorative effects, with subtle animations and consistent

spacing.

- 2. Design System

## Primary Color

#2563EB

Blue 600

## Secondary

#1E293B

Slate 800

## Success

## #22C55E

## Error

## #EF4444


## Warning

#F59E0B

## Background

Light

#FFFFFF

Dark

#0F172A

## Card

Light

#F8FAFC

Dark

#1E293B

- 3. Typography

Font Family

Geist

Fallback

Inter

- 4. Border Radius

Use consistent rounded corners.

Large Cards

16px

Buttons

12px


Inputs

10px

## 5. Shadows

Use soft shadows only.

Avoid excessive glassmorphism.

- 6. Animation

Use subtle animations.

Examples

- Fade In

- Slide Up

- Hover Scale (1.02)

- Button Ripple (optional)

No heavy animations.

## 7. Icons

Use

Lucide React

Examples

- Users

- CreditCard

- GraduationCap

- Download

- Search

- Moon

- Sun

- LayoutDashboard

## 8. Navigation Structure


Public

Home

↓

Course Registration

↓

Internship Application

↓

Success

Admin

Login

↓

Dashboard

↓

Applications

↓

Payments

↓


Export

## 9. Pages

## 1. Home

Sections

Navbar

Hero

Featured Course

Why Choose Us

Internship Section

Footer

## Hero

Left

- Heading

- Description

- CTA Button

Right

- Illustration

- Gradient Background

## Featured Course Card

Contains

- Course Title

- Description


- Duration

- Price

- Register Button

Only one featured course is displayed, matching our simplified scope.

## Why Choose Us

3 feature cards

- Industry Mentors

- Practical Projects

- Certification

## Internship Section

Description

Apply Button

## 10. Registration Page

Layout

Course Summary

↓

Registration Form

Fields

- Name

- Email

- Phone

Button

Continue to Payment

## 11. Payment Success

## Display


## Payment Successful Reference Number Go Home Button Success Animation

## 12. Internship Page

Layout

Simple centered card.

Fields

- Name

- Email

- Phone

- College

- Degree

- Skills

- Duration Dropdown

Button

Submit Application

## 13. Admin Login

Centered login card.

Fields

- Email

- Password

Buttons

- Login

## 14. Admin Dashboard

Layout

Sidebar


+

Top Navbar

+

Content

Sidebar Items

Dashboard

Applications

Payments

Export

Logout

Top Navbar

Contains

- Page Title

- Theme Toggle

- Admin Avatar

Dashboard Cards

Four summary cards:

- Total Applications

- Total Registrations

- Successful Payments

- Revenue


Each card includes:

- Icon

- Value

- Short label

Charts

For this assignment, omit charts. They add complexity without being required by the PRD.

Recent Activity

Display two simple tables:

- Recent Applications

- Recent Payments

Limit each to the latest five entries.

## 15. Applications Page

Table Columns

- Name

- Email

- College

- Duration

- Applied On

- View

Toolbar

- Search

- Refresh

Pagination

10 records per page.

## 16. Payments Page

Table Columns

- Student


- Amount

- Status

- Payment ID

- Date

Toolbar

Search

- Status Filter

- 17. Export Page

Two cards

Card 1

Export Applications

↓

Download Excel

Card 2

Export Payments

↓

Download Excel

## 18. Responsive Design Mobile (<768px)

- Hamburger menu

- Single-column layout

- Cards stack vertically

- Tables become horizontally scrollable

## Tablet (768–1024px)

- Two-column card layouts where appropriate


- Collapsible sidebar

## Desktop (>1024px)

- Permanent sidebar

- Multi-column dashboard

## 19. Theme Support

Include a light/dark mode toggle.

Use CSS variables so all colors adapt consistently between themes.

- 20. Components

Reusable components:

- Navbar

- Footer

- Button

- Input

- Select

- Card

- Modal

- Table

- Search Bar

- Pagination

- Stats Card

- Theme Toggle

- Loading Spinner

- Toast Notifications

## 21. Empty States

When no data exists:

- Show an illustration or icon

- Display a clear message such as:

- o "No applications yet."


- o "No payments found."

## 22. Loading States

Use skeleton loaders for:

- Dashboard cards

- Tables

- Forms

Disable submit buttons while requests are in progress.

- 23. Error Handling

Display inline validation messages beneath form fields.

Use toast notifications for API errors and success messages.

## 24. Accessibility

- Keyboard navigable

- Visible focus states

- Labels associated with inputs

- Sufficient color contrast

- ARIA labels where appropriate

## 25. Final Page Flow

Visitor

│

├── Home

│

├── Course Registration

│

├── Razorpay Payment

│

├── Payment Success


│

└── Internship Application

Admin

│

├── Login

│

├── Dashboard

│

├── Applications

│

├── Payments

│

└── Export
