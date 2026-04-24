# UMTCEMS - Universiti Malaysia Terengganu Club Event Management System

A full-stack campus event management system for UMT clubs to submit, approve, and manage event proposals.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Backend** | Spring Boot 3.2 (Java 17) |
| **Database** | PostgreSQL via Supabase cloud DB |
| **ORM** | Spring Data JPA |

### Frontend Dependencies (already installed)
- `react`, `react-dom`
- `react-router-dom`
- `recharts` (charts)
- `lucide-react` (icons)

### Backend Dependencies (already installed)
- Spring Boot Starter Web
- Spring Data JPA
- PostgreSQL JDBC Driver
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

### 3. PostgreSQL (via Supabase — no local install needed)
- No need to install PostgreSQL locally — Supabase hosts the database
- One person created the Supabase project and shares credentials with the team
- See `backend/SUPABASE_SETUP.md` for step-by-step instructions

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

### Step 2: Database Setup

You do *not* need phpMyAdmin for this project.

Since the backend uses PostgreSQL on Supabase, there is no local MySQL database to create. If you need to run manual SQL, use the **Supabase SQL Editor** in the dashboard.

### Step 3: Supabase Handles the Database
- No local PostgreSQL install needed — Supabase hosts the database for the whole team
- Follow the setup in `backend/SUPABASE_SETUP.md`
- If the schema or seed data already exists, you can skip the manual SQL step

### Step 4: Configure Backend

> **For team development, use Supabase cloud DB** — all 3 teammates share the same database. See `backend/SUPABASE_SETUP.md` for full guide.

**Short version:**

1. One person shares the Supabase connection details with the team
2. Set the database values as environment variables on your machine
3. Keep `backend/src/main/resources/application.properties` as the shared template-driven config

PowerShell example:

```powershell
$env:SUPABASE_DB_URL="jdbc:postgresql://YOUR_HOST:5432/postgres"
$env:SUPABASE_DB_USERNAME="postgres"
$env:SUPABASE_DB_PASSWORD="YOUR_PASSWORD_HERE"
```

4. Start the backend — JPA auto-creates all tables (`ddl-auto=update`)
5. One person runs `backend/src/main/resources/seed-data.sql` once in the Supabase SQL Editor

> Do not commit real Supabase passwords. `application.properties` reads from environment variables.

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
│       ├── application.properties   # DB config (gitignored — use template)
│       ├── application.properties.template  # Shareable config
│       ├── seed-data.sql           # Initial data PostgreSQL (run once)
│       └── SUPABASE_SETUP.md       # Cloud DB guide for team
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
| `Communications link failure` | Check Supabase project is active in the dashboard. If it restarted, verify your `application.properties` host/port are correct |
| `Access denied for user 'postgres'` | Check your `spring.datasource.password=` matches the Supabase password exactly |
| `Could not resolve placeholder 'SUPABASE_DB_URL'` | Set `SUPABASE_DB_URL` and `SUPABASE_DB_PASSWORD` before running the backend |
| `CORS error` in browser | Make sure backend is running on port 8080 |
| `Port 5173 is already in use` | Vite will automatically use 5174 instead — check the terminal output |
| Java errors in VS Code | Install **"Extension Pack for Java"** extension in VS Code |
| `Table 'users' doesn't exist` | Start the app — JPA creates tables automatically on first run (`ddl-auto=update`) |
| Supabase connection refused | Log in to supabase.com/dashboard to wake up the project. Free tier spins down after inactivity |

---

## Backend Maintenance Notes

- Maven wrapper files are committed under `backend/.mvn/wrapper`, so teammates can run `./mvnw` without installing Maven separately.
- Proposal comments and post-event reports hide their back-reference to proposals in JSON responses to avoid recursive API output.

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
3. Read `backend/SUPABASE_SETUP.md` for Supabase database setup
4. Ask in WhatsApp group
5. Ask during lab session
