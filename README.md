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
- Download: https://nodejs.org/ — get **LTS version**
- After installing, verify: open terminal and run `node --version`
- Should show version 18 or 20+

### 2. Java 17+ (for backend)
- Download: https://adoptium.net/ — get **JDK 17** (not just JRE)
- After installing, verify: open terminal and run `java --version`
- Should show "17.x.x" or higher

### 3. MySQL / XAMPP (for database)
- Download XAMPP: https://www.apachefriends.org/
- During install, make sure **MySQL** is checked (Apache is optional)
- After install, open **XAMPP Control Panel**
- Click **Start** next to MySQL — the row should turn green
- Open your browser and go to http://localhost/phpmyadmin

### 4. Git (for version control)
- Download: https://git-scm.com/download/win
- During install, choose **"Git Bash Here"** — it's the easiest option
- Restart your terminal after install, then verify: `git --version`

---

## Quick Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/aidil2105/UMTCEMS.git
cd UMTCEMS
```

### Step 2: Create Database

Open **phpMyAdmin** (http://localhost/phpmyadmin):

1. Click the **SQL** tab at the top
2. Paste this SQL command into the text box:
```sql
CREATE DATABASE umtcems;
```
3. Click **Go** or press Enter

If you see a message like "Database umtcems already exists" — that's fine, it means it was already created. JPA will automatically create the database tables when you run the backend.

### Step 3: Start MySQL

Open **XAMPP Control Panel** → Start **Apache** and **MySQL**

### Step 4: Configure Database

Before running the backend, check `backend/src/main/resources/application.properties` — the password field may need your MySQL password:

```
spring.datasource.username=root
spring.datasource.password=          ← If your MySQL has no password, leave this blank
```

If you set a password during XAMPP install, put it after the `=`. Save the file.

### Step 5: Run Backend

```bash
cd UMTCEMS/backend
./mvnw spring-boot:run
```

> **First time only:** Maven will download all Spring Boot dependencies automatically. This can take **2–5 minutes** — do NOT close the window. It will look like nothing is happening. Just wait until you see `Started UMTCEMSApplication in X.XX seconds`.

Backend runs on: **http://localhost:8080**

### Step 6: Run Frontend

Open a **new terminal window** (keep backend running):

```bash
cd UMTCEMS
npm install    # only first time, or after pulling updates
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## Running Both Simultaneously

You need TWO terminal windows open:

**Terminal 1 — Backend** (must stay running):
```bash
cd UMTCEMS/backend
./mvnw spring-boot:run
```
Backend will be at http://localhost:8080

**Terminal 2 — Frontend** (must stay running):
```bash
cd UMTCEMS
npm run dev
```
Frontend will be at http://localhost:5173

Open your browser and go to **http://localhost:5173**

---

## Project Structure

```
UMTCEMS/                      # React app (no frontend/ subdir)
│   ├── pages/                # All page components
│   ├── components/          # Reusable UI components
│   ├── contexts/             # Auth + Data context
│   ├── App.tsx               # Routes
│   ├── index.tsx             # Entry point
│   ├── types.ts              # TypeScript types
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

Based on the use case modules:
- **Manage user accounts** → HABAN
- **Generate analysis report** → HABAN
- **Manage event proposal** → ALYSSA + AIDIL (shared)
- **Manage post event report** → AIDIL

| Person | Frontend | Backend |
|--------|----------|---------|
| **HABAN** | Profile page, Analytics page | UserController.java |
| **ALYSSA** | SubmitProposal, ProposalDetails (evaluation) | ProposalController.java |
| **AIDIL** | PostEventReport, ProposalDetails (evaluation) | ReportController.java |

### Task Details

| Person | Frontend Pages They Own | Backend Controller |
|--------|------------------------|-------------------|
| **HABAN** | `Profile.tsx` — register, login, change password/email | `UserController.java` — register, login, password, email |
| | `AnalyticsMockup.tsx` → real analytics → analytics for MPP/HEPA | *Analytics built into ReportController* |
| **ALYSSA** | `SubmitProposal.tsx` — submit new proposal | `ProposalController.java` — submit, approve, reject, comments |
| | `ProposalDetails.tsx` — advisor evaluation view | *Shared evaluation endpoints* |
| **AIDIL** | `PostEventReport.tsx` — submit post-event report | `ReportController.java` — submit report, analytics, venue clashes |
| | `ProposalDetails.tsx` — MPP final approval view | *Shared evaluation endpoints* |

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
| `npm is not recognized` | Restart your terminal, or reinstall Node.js |
| Maven/Gradle download seems stuck on first run | Wait 2–5 minutes. First run downloads ~100MB of dependencies. DO NOT close the window. |
| `Communications link failure` | Open XAMPP Control Panel → Start **MySQL** |
| `Access denied for user 'root'` | Edit `application.properties` — add your MySQL password after `=` on the password line |
| `Unknown database 'umtcems'` | Go to http://localhost/phpmyadmin → SQL tab → run `CREATE DATABASE umtcems;` |
| `CORS error` in browser | Make sure backend is running on port 8080 |
| `Port 5173 is already in use` | Vite will automatically use 5174 instead — check the terminal output |
| Java errors in VS Code | Install **"Extension Pack for Java"** extension in VS Code |
| `Table 'proposals' doesn't exist` | Start the app — JPA creates tables automatically on first run |

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

| Name | Modules |
|------|---------|
| **Haban** | Manage user accounts + Generate analysis report |
| **Alyssa** | Manage event proposal (evaluation workflow) |
| **Aidil** | Manage event proposal (shared) + Manage post event report |

---

## Need Help?

1. Read the TODO comments in your controller file
2. Read `backend/README.md` for detailed backend instructions
3. Ask in WhatsApp group
4. Ask during lab session
