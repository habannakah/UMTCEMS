# UMTCEMS - Universiti Malaysia Terengganu Club Event Management System

A full-stack campus event management system for UMT clubs to submit, approve, and manage event proposals.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Backend** | Spring Boot 3.2 (Java 17) |
| **Database** | MySQL (via XAMPP) |
| **ORM** | Spring Data JPA |

### Frontend Dependencies (already installed)
- `react`, `react-dom`
- `react-router-dom`
- `recharts` (charts)
- `lucide-react` (icons)

### Backend Dependencies (already installed)
- Spring Boot Starter Web
- Spring Data JPA
- MySQL Connector
- Lombok
- Validation

---

## Prerequisites - What You Need to Install

### 1. Node.js (for frontend)
- Download: https://nodejs.org/
- Get **LTS version**
- Verify: `node --version`

### 2. Java 17+ (for backend)
- Download: https://adoptium.net/
- Get **JDK 17** or higher
- Verify: `java --version`

### 3. MySQL / XAMPP (for database)
- Download XAMPP: https://www.apachefriends.org/
- Install with MySQL enabled
- Start Apache and MySQL from XAMPP Control Panel
- Access phpMyAdmin: http://localhost/phpmyadmin

### 4. Git (for version control)
- Download: https://git-scm.com/download/win
- Use default settings during install

---

## Quick Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/aidil2105/UMTCEMS.git
cd UMTCEMS
```

### Step 2: Create Database

Open **phpMyAdmin** (http://localhost/phpmyadmin) and run:

```sql
CREATE DATABASE umtcems;
```

JPA will automatically create the database tables when you run the backend.

### Step 3: Start MySQL

Open **XAMPP Control Panel** → Start **Apache** and **MySQL**

### Step 4: Run Backend

```bash
cd UMTCEMS/backend
./mvnw spring-boot:run
```

Wait until you see: `Started UMTCEMSApplication in X.XX seconds`
Backend runs on: **http://localhost:8080**

### Step 5: Run Frontend

Open a **new terminal window** (keep backend running):

```bash
cd UMTCEMS/frontend
npm install    # only first time, or after pulling updates
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## Running Both Simultaneously

You need TWO terminal windows open:

| Terminal 1 | Terminal 2 |
|-----------|-----------|
| `cd backend && ./mvnw spring-boot:run` | `cd frontend && npm run dev` |
| Backend on :8080 | Frontend on :5173 |

Open browser: **http://localhost:5173**

---

## Project Structure

```
UMTCEMS/
├── frontend/                 # React app
│   ├── src/
│   │   ├── pages/            # All page components
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # Auth + Data context
│   │   ├── App.tsx           # Routes
│   │   └── types.ts          # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Spring Boot app
│   ├── src/main/java/com/umtcems/
│   │   ├── UMTCEMSApplication.java  # Main class - RUN THIS
│   │   ├── config/                  # CORS config (done)
│   │   ├── model/                   # JPA entities (done)
│   │   ├── repository/              # JPA repositories (done)
│   │   └── controller/              # API endpoints (FILL IN)
│   │       ├── UserController.java     ← HABAN
│   │       ├── ProposalController.java ← ALYSSA
│   │       └── ReportController.java  ← AIDIL
│   └── src/main/resources/
│       └── application.properties  # DB config
│
├── TASK_SPLIT.md             # Individual task assignments
└── package.json              # (root - not used)
```

---

## Individual Tasks - Who Does What

| Person | Controller | What They Build |
|--------|-----------|-----------------|
| **HABAN** | `UserController.java` | Register, Login, Change Password, Update Email |
| **ALYSSA** | `ProposalController.java` | Submit Proposal, Approve/Reject, Comments |
| **AIDIL** | `ReportController.java` | Post-Event Reports, Analytics, Venue Clashes |

**Each person fills in their assigned controller — read the TODO comments inside each file.**

### Files Each Person Edits

```
backend/src/main/java/com/umtcems/controller/
├── UserController.java      ← HABAN codes this
├── ProposalController.java  ← ALYSSA codes this
└── ReportController.java    ← AIDIL codes this
```

### Files You DON'T Touch (already done)

```
backend/src/main/java/com/umtcems/
├── UMTCEMSApplication.java   ← RUN THIS (don't edit)
├── config/CorsConfig.java    ← Done (don't edit)
├── model/*.java             ← Done (don't edit)
└── repository/*.java         ← Done (don't edit)
```

---

## Git Workflow

### Before Starting: Pull Latest Changes

```bash
git pull origin main
```

### Create Your Branch

```bash
git checkout -b feature/yourname-backend
```

### After Coding: Save Your Work

```bash
git add src/main/java/com/umtcems/controller/YourController.java
git commit -m "feat: Implement login and register endpoints"
git push origin feature/yourname-backend
```

**IMPORTANT: Only commit YOUR controller file. Do not touch other people's files.**

---

## Common Issues & Fixes

| Error | Fix |
|-------|-----|
| `npm is not recognized` | Restart terminal, or reinstall Node.js |
| `Communications link failure` | Start XAMPP → Apache + MySQL |
| `Access denied for user 'root'` | Add your MySQL password to `application.properties` |
| `Unknown database 'umtcems'` | Run `CREATE DATABASE umtcems;` in phpMyAdmin |
| `CORS error` in browser | Make sure backend is running on port 8080 |
| `Port 5173 is already in use` | Vite will use next port (5174) automatically |
| Java errors in VS Code | Install "Extension Pack for Java" in VS Code |

---

## API Endpoints Summary

### User Management (HABAN)
```
POST   /api/users/register
POST   /api/users/login
PUT    /api/users/{id}/password
PUT    /api/users/{id}/email
GET    /api/users
GET    /api/users/{id}
```

### Proposal Workflow (ALYSSA)
```
POST   /api/proposals
GET    /api/proposals
GET    /api/proposals/{id}
GET    /api/proposals/club/{clubName}
PUT    /api/proposals/{id}/approve-advisor
PUT    /api/proposals/{id}/request-changes
PUT    /api/proposals/{id}/approve-mpp
PUT    /api/proposals/{id}/reject
PUT    /api/proposals/{id}/resubmit
POST   /api/proposals/{id}/comments
```

### Reports & Analytics (AIDIL)
```
POST   /api/reports
GET    /api/reports
GET    /api/reports/proposal/{proposalId}
GET    /api/reports/analytics
GET    /api/reports/venue-clashes
GET    /api/reports/pending
```

---

## Team Members

- **Aidil** — Post-Event Reports + MPP Approval
- **Alyssa** — Proposal Submission + Evaluation Workflow
- **Haban** — User Accounts + Analytics

---

## Need Help?

1. Read the TODO comments in your controller file
2. Read `backend/README.md` for detailed backend instructions
3. Ask in WhatsApp group
4. Ask during lab session
