# UMTCEMS - Individual Task Split

## Overview
This document outlines how to split the UMTCEMS project for **individual marking**. Each team member owns specific pages/workflows that are clearly attributable through git history.

**Key Principle:** Each person logs in as THEIR assigned role and demos only that role's complete workflow.

---

## Git Branch Strategy

```
main (protected)
├── feature/haban-user-accounts    ← Haban works here
├── feature/haban-analytics        ← Haban works here  
├── feature/alyssa-proposal-evaluation ← Alyssa works here
├── feature/aidil-post-event-report    ← Aidil works here
└── feature/aidil-mpp-approval        ← Aidil works here
```

**Workflow:**
1. Each person creates their own branch from `main`
2. Work on your assigned features only
3. Commit with clear messages: `git commit -m "feat: Add email change functionality for Profile page"`
4. When done, submit a PR or merge to main
5. Each person's git log --author will show their individual work

---

## Task Assignments

---

### 🟢 HABAN — User Accounts + Analytics

**Branch:** `feature/haban-user-accounts` (Profile) + `feature/haban-analytics` (Analytics)

**My Role:** CLUB_REP (to demo your features)
**Your Role for Demo:** ADVISOR / HEPA_STAFF (for analytics)

#### 1. Profile Page Enhancement (`Profile.tsx`)

The profile page already exists. **Enhancements needed:**

- [ ] **Email Change Feature** — Allow users to change their own email (currently disabled)
  - Add email edit mode toggle
  - Add email format validation
  - Update `updateUser` in AuthContext to handle email changes
  
- [ ] **Password Validation** — Strengthen the password change flow
  - Minimum 8 characters, at least 1 uppercase, 1 number, 1 special char
  - Show password strength indicator
  - "Current password" verification (mock the check)

- [ ] **Club Selection** — For Club Reps/Advisors, allow changing club association
  - Dropdown of available clubs (mock data is fine)

**File to modify:** `pages/Profile.tsx`, `contexts/AuthContext.tsx`

**Demo Flow:**
1. Login as Club Rep
2. Go to Profile
3. Change name → Save
4. Change email → Save
5. Change password → Verify old password → new password → confirm

#### 2. Analytics Page (`AnalyticsMockup.tsx` → Real Analytics)

Currently a mockup. **Convert to real analytics:**

- [ ] **Real Stats Calculation** — Replace hardcoded values with actual data from `useData()`
  - Total proposals count
  - Approved vs pending ratio
  - Completion rate
  - Average processing time (from history timestamps)

- [ ] **Charts with Recharts** — Already in dependencies, use them!
  - Bar chart: Proposals per club
  - Pie chart: Status distribution
  - Line chart: Submissions over time (mock monthly data)

- [ ] **Role-Based Analytics**
  - ADVISOR sees: their club's stats only
  - MPP_EXCO sees: all proposals, filtered
  - HEPA_STAFF sees: compliance-related stats

**File to modify:** `pages/AnalyticsMockup.tsx`

**Demo Flow:**
1. Login as HEPA_STAFF
2. Go to Analytics
3. View charts showing proposal statistics
4. Filter by date range (add date picker)

---

### 🟢 ALYSSA — Proposal Evaluation (Advisor Review)

**Branch:** `feature/alyssa-proposal-evaluation`

**My Role:** ADVISOR (to demo your features)
**Your Role for Demo:** ADVISOR or MPP_EXCO

#### 1. ProposalDetails Page — Advisor Review Enhancement

The review actions (Approve/Reject/Amend) already exist. **Enhancements needed:**

- [ ] **Review Comments Enhancement**
  - Make comments mandatory for Reject and Amend (already exists)
  - Add comment templates/quick-select (e.g., "Please include budget breakdown", "Venue not available")
  - Character count for comments
  
- [ ] **Advisor-specific View**
  - When ADVISOR views ProposalDetails, show only their club's proposals
  - Block access to other clubs' proposals with "Access Denied" message
  - Already partially implemented — verify and enhance

- [ ] **Email Notification Mock**
  - After approval/rejection, show a mock "email sent" notification
  - Toast notification: "Email sent to club representative"

- [ ] **History Enhancement**
  - When advisor approves, the history shows their name and timestamp
  - Already exists in `updateProposalStatus` — verify the flow works correctly

- [ ] **Add "View Amendment History"** — Show all previous amendment requests in the timeline
  - Track how many times a proposal was returned for revision

**File to modify:** `pages/ProposalDetails.tsx`, `components/StatusBadge.tsx`

**Demo Flow:**
1. Login as ADVISOR
2. Go to Dashboard → See pending proposals
3. Click on a proposal → View details
4. Click "Request Changes" → Add comment from template
5. Club Rep resubmits → You see it again → Approve
6. Watch it move to MPP queue

#### 2. Dashboard Advisor Section Enhancement

- [ ] **Advisor Dashboard Statistics**
  - Add more stats: proposals approved this month, average review time
  - Add "Recently Reviewed" quick list

**File to modify:** `pages/Dashboard.tsx` (AdvisorDashboard component)

---

### 🟢 AIDIL — Post-Event Report + MPP Final Approval

**Branch:** `feature/aidil-post-event-report` + `feature/aidil-mpp-approval`

**My Role:** CLUB_REP (post-event report) + MPP_EXCO (approval flow)
**Your Role for Demo:** CLUB_REP + MPP_EXCO

#### 1. Post-Event Report Page (`PostEventReport.tsx`)

Already has submission flow. **Enhancements needed:**

- [ ] **File Upload Enhancement**
  - Actually handle the file input (currently mock)
  - Show selected file name prominently
  - Validate file type (PDF, DOC only) and size (max 5MB)
  - Show upload progress indicator (mock)

- [ ] **Photo Upload**
  - Implement the optional photo upload
  - Preview thumbnails of uploaded photos
  - Support JPG, PNG — max 5 files, 5MB each

- [ ] **Report Form Fields** — Add more fields to the report:
  - Actual attendance count (number input)
  - Event outcomes summary (textarea)
  - Budget spent vs budgeted (comparison)
  - Problems faced (textarea)
  - Next year improvements (textarea)

- [ ] **Report Status Tracking**
  - Show which reports are pending vs submitted
  - Add "Edit Report" functionality if report needs revision

**File to modify:** `pages/PostEventReport.tsx`, `contexts/DataContext.tsx` (update types)

**Demo Flow:**
1. Login as CLUB_REP
2. Go to Post-Event Reports
3. Select an approved event
4. Fill in report form with actual attendance, photos, etc.
5. Submit
6. See "Report Submitted Successfully" confirmation
7. Go back → See report in "My Reports" list

#### 2. ExcoDashboard — MPP Final Approval Enhancement (`Dashboard.tsx`)

Already has a Kanban board. **Enhancements needed:**

- [ ] **MPP Final Approve/Reject Actions** — Make it functional
  - From Kanban card → Open ProposalDetails → MPP can Approve or Reject
  - Add "Reject" with mandatory reason comment
  - After rejection, proposal moves to "Rejected" state (not visible in active Kanban)

- [ ] **Kanban Enhancement**
  - Columns: "Pending MPP", "Approved", "Rejected"
  - Drag-and-drop (nice-to-have, optional)
  - Filter by club, date range

- [ ] **MPP Dashboard Statistics**
  - Approval rate percentage
  - Average time from submission to MPP decision
  - Proposals by club (bar chart)
  - Add date range filter

- [ ] **Venue Clash Detection**
  - If two proposals have the SAME event date + venue, show warning
  - Show in "Event Date Checker" section
  - Already has placeholder data — make it dynamic

**File to modify:** `pages/Dashboard.tsx` (ExcoDashboard component), `pages/ProposalDetails.tsx`

**Demo Flow:**
1. Login as MPP_EXCO
2. Go to Dashboard → See Kanban board
3. "Pending MPP" column shows proposals passed by advisor
4. Click on card → View details
5. Click "Approve" → Proposal moves to Approved column
6. Or click "Reject" → Add reason → Proposal archived
7. View "Event Date Checker" → See venue clash warnings

---

## Data Context Updates Needed (All)

Update `types.ts` to support the new fields:

```typescript
// Add to Proposal interface:
postEventReport?: {
  reportFile: string;
  photos: string[];
  submittedDate: string;
  actualAttendance?: number;
  outcomesSummary?: string;
  budgetSpent?: string;
  problemsFaced?: string;
  improvements?: string;
};
```

Update `DataContext.tsx` `submitReport` function to accept these new fields.

---

## Mock Data Instructions (All)

For demo purposes, the `DataContext.tsx` already has mock data. Each person should:

1. Add 2-3 mock proposals specific to their demo flow
2. For Haban: Ensure some proposals are old enough to show "analytics" trends
3. For Alyssa: Ensure at least 2 proposals are in PENDING_ADVISOR status
4. For Aidil: Ensure at least 2 proposals are in APPROVED status (for post-event report demo)

---

## Submission Instructions

1. **Clone the repo fresh** on your local machine
2. **Create your branch:** `git checkout -b feature/yourname-feature`
3. **Make your changes** — only modify your assigned files
4. **Commit clearly:** `git commit -m "feat: Add email validation to Profile page"`
5. **Push:** `git push origin feature/yourname-feature`
6. **Create PR** or share the branch name

### For Demo Day:
Each person will:
1. Run `npm run dev`
2. Login as their assigned role
3. Navigate to their assigned page
4. Demonstrate their features
5. Answer questions about YOUR code (not someone else's)

---

## File Ownership Table

| File | Owner | Purpose |
|------|-------|---------|
| `pages/Profile.tsx` | HABAN | User account settings |
| `pages/AnalyticsMockup.tsx` | HABAN | Real analytics with charts |
| `pages/ProposalDetails.tsx` | ALYSSA | Advisor/MPP review workflow |
| `pages/Dashboard.tsx` (AdvisorDashboard) | ALYSSA | Advisor-specific stats |
| `pages/PostEventReport.tsx` | AIDIL | Post-event report submission |
| `pages/Dashboard.tsx` (ExcoDashboard) | AIDIL | MPP approval workflow |
| `contexts/AuthContext.tsx` | HABAN | Auth enhancements |
| `contexts/DataContext.tsx` | ALL | Data layer updates |
| `types.ts` | ALL | Type definitions |

---

## Questions?

If there's overlap or conflict, ask the team in WhatsApp. If two people need to modify the same file, coordinate in advance.
