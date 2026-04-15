# UMTCEMS - Universiti Malaysia Terengganu Club Event Management System

A web-based event management system for campus events, built with React, TypeScript, and Vite.

## Project Overview

UMTCEMS allows users to submit, approve, and manage campus event proposals. Features include:
- Event proposal submission and approval workflow
- Dashboard with analytics
- Event reporting
- User profiles

## Team Members

- Aidil
- Alyssa
- Haban

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React

---

## Getting Started (For Teammates)

### Prerequisites

You need **Node.js** installed on your computer.
- Download from: https://nodejs.org/
- Get the **LTS** version (recommended)

### Step 1: Install Git (If You Haven't)

1. Download Git from: https://git-scm.com/download/win
2. Run the installer with default settings
3. Restart your computer after installation

### Step 2: Clone the Repository

Open **Git Bash** (installed with Git) and run:

```bash
cd /c/Users/aidil/OneDrive/Desktop/Projects/AppDevMain

git clone https://github.com/aidil2105/UMTCEMS.git

cd UMTCEMS
```

> **Note**: If you get "permission denied" errors, contact the repo owner to add you as a collaborator.

### Step 3: Install Dependencies

In the UMTCEMS folder, run:

```bash
npm install
```

This will install all the libraries needed for the project. Wait for it to finish.

### Step 4: Run the Project Locally

```bash
npm run dev
```

Then open your browser and go to: **http://localhost:5173**

---

## How to Update the Project (Git Workflow)

### Before You Start Coding: Pull Latest Changes

Always pull before you start working to avoid merge conflicts:

```bash
git pull origin main
```

### After Making Changes: Save Your Work

1. **Check what files you changed:**
   ```bash
   git status
   ```

2. **Add files you want to commit:**
   ```bash
   git add filename.ts    # for single file
   git add .              # for all changed files
   ```

3. **Commit (save) your changes:**
   ```bash
   git commit -m "Describe what you did"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

---

## Project Structure

```
UMTCEMS/
├── components/       # Reusable UI components
├── contexts/          # React context for state management
├── pages/             # Page components
│   ├── Auth.tsx           # Login page
│   ├── Dashboard.tsx      # Main dashboard
│   ├── SubmitProposal.tsx # Submit new event
│   ├── ApprovedEvents.tsx # View approved events
│   ├── Analytics.tsx      # View analytics/charts
│   └── ...
├── App.tsx            # Main app component
├── index.tsx         # Entry point
└── package.json      # Dependencies
```

---

## Common Issues

### "npm is not recognized"

Restart your terminal or computer. If still not working, reinstall Node.js.

### "git is not recognized"

Install Git first (see Step 1 above).

### "Port 5173 is already in use"

Another process is using that port. You can either:
- Stop the other process
- Or Vite will automatically use the next available port

---

## Need Help?

Ask the repo owner or check the GitHub issues page if something is broken.
