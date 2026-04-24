# UMTCEMS Backend - Setup Guide

**Frontend is DONE. Backend is what we build now.**

---

## WHO DOES WHAT (Based on Use Case Modules)

Based on your module.txt assignment:
- **Manage user accounts** → HABAN
- **Generate analysis report** → HABAN
- **Manage event proposal** → ALYSSA + AIDIL (shared)
- **Manage post event report** → AIDIL

| Person | Module | Backend Controller | Endpoints They Build |
|--------|--------|-------------------|---------------------|
| **HABAN** | User accounts + Analytics | `UserController.java` | Register, Login, Change Password, Update Email |
| **ALYSSA** | Event proposal (evaluation) | `ProposalController.java` | Submit Proposal, Approve/Reject, Comments |
| **AIDIL** | Event proposal (shared) + Post-event report | `ReportController.java` | Submit Report, Analytics, Venue Clash Check |

**Note for event proposal:** ALYSSA and AIDIL share the same `ProposalController.java`. ALYSSA handles proposal submission + advisor review flow. AIDIL handles MPP final approval + post-event report linking.

**Each person is RESPONSIBLE for their own controller. You code YOUR endpoints. You test YOUR endpoints.**

---

## STEP 1: SETUP (Do once)

### 1.1: Pull Latest Code
```bash
cd UMTCEMS
git pull origin main
```

### 1.2: Supabase PostgreSQL (No Local Database)

No local database needed — Supabase hosts PostgreSQL for the whole team.

1. Get the Supabase database URL and password from your teammate
2. Set them as environment variables before starting the backend
3. See `SUPABASE_SETUP.md` for full details

JPA will create the tables automatically when you run the app.

### 1.3: Configure Database
`backend/src/main/resources/application.properties` reads database settings from environment variables.

PowerShell example:

```powershell
$env:SUPABASE_DB_URL="jdbc:postgresql://YOUR_HOST:5432/postgres"
$env:SUPABASE_DB_USERNAME="postgres"
$env:SUPABASE_DB_PASSWORD="YOUR_PASSWORD_HERE"
```

Do not commit real Supabase passwords.

---

## STEP 2: RUN THE BACKEND

```bash
cd UMTCEMS/backend
./mvnw spring-boot:run
```

Wait until you see:
```
Started UMTCEMSApplication in X.XXX seconds
```

Backend runs on **http://localhost:8080**

---

## STEP 3: RUN THE FRONTEND

```bash
cd UMTCEMS/frontend
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## YOUR TASK PER PERSON

---

### HABAN → User Accounts + Analytics

**Module:** Manage user accounts + Generate analysis report

**File to edit:** `src/main/java/com/umtcems/controller/UserController.java`

**Your 6 endpoints:**

| # | Method | URL | What it does |
|---|--------|-----|--------------|
| 1 | POST | `/api/users/register` | Create new user account |
| 2 | POST | `/api/users/login` | Login with email + password |
| 3 | PUT | `/api/users/{id}/password` | Change password (verify old first) |
| 4 | PUT | `/api/users/{id}/email` | Change email |
| 5 | GET | `/api/users` | Get all users (for testing) |
| 6 | GET | `/api/users/{id}` | Get user by ID |

**Also:** Enhance `AnalyticsMockup.tsx` in frontend to show real data from `/api/reports/analytics`.

**Steps to complete each endpoint are in the TODO comments inside the file.**

---

### ALYSSA → Event Proposal (Proposal Submission + Advisor Review)

**Module:** Manage event proposal (shared with Aidil)

**File to edit:** `src/main/java/com/umtcems/controller/ProposalController.java`

**Your endpoints in the shared controller:**

| # | Method | URL | What it does |
|---|--------|-----|--------------|
| 1 | POST | `/api/proposals` | Submit new event proposal |
| 2 | GET | `/api/proposals` | Get all proposals |
| 3 | GET | `/api/proposals/club/{clubName}` | Get proposals by club |
| 4 | GET | `/api/proposals/{id}` | Get proposal by ID |
| 5 | PUT | `/api/proposals/{id}/approve-advisor` | Advisor approves → moves to MPP |
| 6 | PUT | `/api/proposals/{id}/request-changes` | Advisor requests amendments |
| 7 | PUT | `/api/proposals/{id}/resubmit` | Club rep resubmits after changes |
| 8 | POST | `/api/proposals/{id}/comments` | Add comment to proposal |

**Frontend:** `SubmitProposal.tsx` (submit new proposal) + advisor view in `ProposalDetails.tsx`

**Steps to complete each endpoint are in the TODO comments inside the file.**

---

### AIDIL → Event Proposal (MPP Approval) + Post-Event Report

**Module:** Manage event proposal (shared with Alyssa) + Manage post event report

**File to edit:** `src/main/java/com/umtcems/controller/ReportController.java`

**Also shared in:** `ProposalController.java` (MPP endpoints)

**Your endpoints in ReportController:**

| # | Method | URL | What it does |
|---|--------|-----|--------------|
| 1 | POST | `/api/reports` | Submit post-event report |
| 2 | GET | `/api/reports` | Get all reports |
| 3 | GET | `/api/reports/proposal/{proposalId}` | Get report by proposal ID |
| 4 | GET | `/api/reports/analytics` | Get proposal statistics |
| 5 | GET | `/api/reports/venue-clashes` | Check for date/venue conflicts |
| 6 | GET | `/api/reports/pending` | List approved events missing reports |

**Your endpoints in ProposalController (MPP part, shared with Alyssa):**

| # | Method | URL | What it does |
|---|--------|-----|--------------|
| 9 | PUT | `/api/proposals/{id}/approve-mpp` | MPP final approval |
| 10 | PUT | `/api/proposals/{id}/reject` | MPP rejects proposal |

**Frontend:** `PostEventReport.tsx` (submit report) + MPP view in `ProposalDetails.tsx` + `ExcoDashboard.tsx` (MPPs approval queue)

**Steps to complete each endpoint are in the TODO comments inside the file.**

---

## HOW TO CODE YOUR ENDPOINTS

### Pattern for a simple endpoint:

```java
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    String password = body.get("password");
    String name = body.get("name");

    // Check if email exists
    if (userRepository.existsByEmail(email)) {
        return ResponseEntity.badRequest().body("Email already exists");
    }

    // Create new user
    User user = new User();
    user.setEmail(email);
    user.setPassword(password); // In real app: hash the password!
    user.setName(name);
    user.setRole(UserRole.valueOf(body.get("role")));
    user.setClubName(body.get("clubName"));

    // Save to database
    user = userRepository.save(user);

    return ResponseEntity.ok(user);
}
```

### Pattern for a status update:

```java
@PutMapping("/{id}/approve-mpp")
public ResponseEntity<?> approveAsMpp(@PathVariable Long id, @RequestBody Map<String, String> body) {
    // 1. Find the proposal
    Optional<Proposal> optProposal = proposalRepository.findById(id);
    if (optProposal.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    // 2. Update status
    Proposal proposal = optProposal.get();
    proposal.setStatus(ProposalStatus.APPROVED);

    // 3. Add to history (append to JSON string)
    String history = proposal.getHistory() + ",APPROVED by MPP";
    proposal.setHistory(history);

    // 4. Save
    proposal = proposalRepository.save(proposal);

    // 5. Return
    return ResponseEntity.ok(proposal);
}
```

### Working with related data (comments):

```java
@PostMapping("/{id}/comments")
public ResponseEntity<?> addComment(@PathVariable Long id, @RequestBody Map<String, String> body) {
    Optional<Proposal> optProposal = proposalRepository.findById(id);
    if (optProposal.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    Proposal proposal = optProposal.get();

    Comment comment = new Comment();
    comment.setAuthorName(body.get("authorName"));
    comment.setAuthorRole(UserRole.valueOf(body.get("authorRole")));
    comment.setContent(body.get("content"));
    comment.setType(body.get("type"));
    comment.setTimestamp(LocalDate.now().toString());
    comment.setProposal(proposal);

    comment = commentRepository.save(comment);

    return ResponseEntity.ok(comment);
}
```

---

## HOW JPA WORKS (You don't write SQL!)

Just call these methods and JPA generates the SQL:

```java
// Find by email
userRepository.findByEmail("ali@umt.edu.my")

// Find all by status
proposalRepository.findByStatus(ProposalStatus.APPROVED)

// Find by club name
proposalRepository.findByClubName("Computer Science Club")

// Save (insert OR update)
userRepository.save(user)

// Delete
proposalRepository.deleteById(1L)

// Count all
proposalRepository.count()
```

---

## CONNECTING FRONTEND TO BACKEND

### In your React DataContext (`contexts/DataContext.tsx`):

Instead of mock data, call the API:

```javascript
// Example: Login
const login = async (email, password) => {
    const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
        const user = await response.json();
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    }
    return false;
};

// Example: Get proposals
const getProposals = async () => {
    const response = await fetch('http://localhost:8080/api/proposals');
    const data = await response.json();
    setProposals(data);
};
```

### Update each frontend page to fetch from backend:

- **Profile page** → Call `PUT /api/users/{id}/email` and `PUT /api/users/{id}/password`
- **SubmitProposal page** → Call `POST /api/proposals`
- **ProposalDetails page** → Call `PUT /api/proposals/{id}/approve-advisor`, etc.
- **PostEventReport page** → Call `POST /api/reports`
- **Dashboard** → Call `GET /api/reports/analytics`

---

## TESTING YOUR API

### With curl (run in terminal):

```bash
# Register a user
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali","email":"ali@umt.edu.my","password":"123","role":"CLUB_REP","clubName":"CS Club"}'

# Get all users
curl http://localhost:8080/api/users

# Submit a proposal
curl -X POST http://localhost:8080/api/proposals \
  -H "Content-Type: application/json" \
  -d '{"title":"Tech Talk","clubName":"CS Club","eventDate":"2024-10-15","venue":"Auditorium"}'

# Get all proposals
curl http://localhost:8080/api/proposals
```

### With Postman:
1. New Request → Set Method (GET/POST/PUT/DELETE)
2. Set URL
3. For POST/PUT: Body → raw → JSON
4. Send!

---

## COMMON ERRORS

| Error | Fix |
|-------|-----|
| `Communications link failure` | Check Supabase is active at supabase.com/dashboard. The project may have spun down from inactivity — log in to wake it up |
| `Access denied for user 'postgres'` | Verify your `spring.datasource.password=` matches the Supabase password |
| `Could not resolve placeholder 'SUPABASE_DB_URL'` | Set `SUPABASE_DB_URL` and `SUPABASE_DB_PASSWORD` before running the backend |
| `Table 'users' doesn't exist` | Start the app — JPA creates tables automatically (`ddl-auto=update`) |
| `CORS error` in browser | Make sure CorsConfig.java is loaded |
| `404 Not Found` | Check your URL path matches the @RequestMapping |

---

## BACKEND MAINTENANCE NOTES

- The Maven wrapper is committed under `.mvn/wrapper`, so teammates can run `./mvnw` without installing Maven separately.
- `Comment` and `PostEventReport` hide their back-reference to `Proposal` in JSON responses. This prevents recursive API output when returning proposals, comments, and reports.
- Controller TODO methods are still intentionally assigned work. The recent backend maintenance fixes do not complete any teammate's assignment endpoints.

---

## WHAT TO DO IF STUCK

1. Read the TODO comments in your controller file — they have step-by-step instructions
2. Check Spring Data JPA docs: method names like `findByEmail` auto-generate SQL
3. Run `./mvnw spring-boot:run` and check the console output
4. Ask in WhatsApp group
5. Ask during lab session

---

## GIT WORKFLOW

1. **Create your branch:**
   ```bash
   git checkout -b feature/yourname-backend
   ```

2. **Code your controller** (only your file, not others' files)

3. **Commit with clear message:**
   ```bash
   git add src/main/java/com/umtcems/controller/YourController.java
   git commit -m "feat: Implement login and register endpoints"
   ```

4. **Push:**
   ```bash
   git push origin feature/yourname-backend
   ```

5. **When done, create a Pull Request** or tell the team to merge

**IMPORTANT:** Only commit YOUR controller file. Don't touch other people's controller files.

---

## FILE STRUCTURE REMINDER

```
backend/src/main/java/com/umtcems/
├── UMTCEMSApplication.java   ← Main class (DO NOT EDIT)
├── config/
│   └── CorsConfig.java       ← CORS setup (DO NOT EDIT)
├── model/
│   ├── User.java            ← User entity (DO NOT EDIT)
│   ├── Proposal.java        ← Proposal entity (DO NOT EDIT)
│   ├── Comment.java        ← Comment entity (DO NOT EDIT)
│   ├── PostEventReport.java ← Report entity (DO NOT EDIT)
│   ├── UserRole.java        ← Enum (DO NOT EDIT)
│   └── ProposalStatus.java ← Enum (DO NOT EDIT)
├── repository/
│   ├── UserRepository.java         ← Auto-generates SQL (DO NOT EDIT)
│   ├── ProposalRepository.java   ← Auto-generates SQL (DO NOT EDIT)
│   ├── CommentRepository.java    ← Auto-generates SQL (DO NOT EDIT)
│   └── PostEventReportRepository.java ← Auto-generates SQL (DO NOT EDIT)
└── controller/
    ├── UserController.java      ← HABAN EDITS THIS
    ├── ProposalController.java ← ALYSSA EDITS THIS
    └── ReportController.java    ← AIDIL EDITS THIS
```

"DO NOT EDIT" = it's already done, you just use these classes in your controller.

---

## SUCCESS CRITERIA

Your part is DONE when:

- [ ] You can register a new user via API
- [ ] You can login and get the user back
- [ ] All your assigned endpoints return correct responses
- [ ] The React frontend can call your API and display real data
- [ ] No errors in Spring Boot console when calling your endpoints
