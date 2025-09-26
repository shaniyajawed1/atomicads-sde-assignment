# 🚨 Atomic Ads - Alerting & Notification Platform (MVP Submission)

**Candidate:** Shaniya Jawed  

---

## 📌 Overview
This project is an **MVP of an Alerting & Notification Platform** designed for Admins and End Users.  
It implements **in-app alerts**, **snooze functionality**, **read/unread tracking**, and **visibility management** (Org/Team/User).  

---

## 🛠 Features Implemented

### 👩‍💼 Admin
- Create alerts with:
  - Title & message 📝
  - Severity: Info ℹ️, Warning ⚠️, Critical ❌
  - Start & expiry time ⏰
- Configure visibility:
  - Organization 🌐
  - Team 👥
  - User 👤

### 👨‍💻 End User
- Fetch alerts based on visibility 🔔
- Mark alerts as read/unread ✅❌
- Snooze alerts for the day ⏳ (resets next day)

### 📊 Shared
- Data models:
  - `Alert`, `User`, `Team`, `UserAlertPreference`
- Seed data for testing users and teams

---

## ⚠️ Areas Not Fully Implemented
- Email/SMS notification channels ✉️📱
- Custom reminder frequencies (beyond 2 hours) ⏱️
- Analytics dashboard API 📊
- Role-based access control 🛡️

---

## 🚀 How to Run

1. Install dependencies:

```bash

npm install

2. Compile TypeScript:

```bash

npx tsc

3. Start the server:

```bash

npm start

4. Use the endpoints in /routes to test Admin/User features.


🔗 API Endpoints

Admin:

-- POST /admin/alerts – Create alert

-- PUT /admin/alerts/:id – Update alert

-- GET /admin/alerts – List alerts

User:

-- GET /user/alerts – Fetch alerts

-- PUT /user/alerts/:id/read – Mark as read/unread

-- PUT /user/alerts/:id/snooze – Snooze alert

💡 Notes

-- Reminder logic is simulated via APIs for demo purposes.

-- Code follows OOP principles, modular structure, and is designed for extensibility.

-- Future improvements planned include:

-- Email/SMS notifications ✉️📱

-- Analytics dashboard 📊

-- Escalations ⬆️

📁 Project Structure

backend/
│
├─ src/
│   ├─ controllers/
│   ├─ repositories/
│   ├─ routes/
│   └─ index.ts
│
├─ package.json
└─ tsconfig.json


✅ Submission

This is the MVP submission for the Atomic Ads SDE Intern assignment.