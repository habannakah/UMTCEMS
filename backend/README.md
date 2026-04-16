# UMTCEMS Backend - Spring Boot

Event Management System Backend API using Spring Boot + JPA + MySQL

---

## Prerequisites

1. **Java 17+** - Download from https://adoptium.net/
2. **MySQL** - Your XAMPP MySQL (default: localhost:3306)
3. **Maven** - Comes with Spring Boot (or use `./mvnw` wrapper)

---

## Quick Setup

### Step 1: Create MySQL Database

Open phpMyAdmin (http://localhost/phpmyadmin) or MySQL CLI and run:

```sql
CREATE DATABASE umtcems;
```

That's it! JPA will create the tables automatically.

### Step 2: Configure Database Connection

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/umtcems
spring.datasource.username=root
spring.datasource.password=
```

If your MySQL has a password, add it. If using XAMPP default, leave it empty.

### Step 3: Run the Backend

```bash
cd backend
./mvnw spring-boot:run
```

Or in VS Code: Right-click `UMTCEMSApplication.java` → Run As → Java Application

Backend will start on **http://localhost:8080**

### Step 4: Run the Frontend

```bash
cd frontend
npm run dev
```

Frontend on **http://localhost:5173**

---

## Project Structure

```
backend/
├── pom.xml                          # Maven dependencies
├── src/main/java/com/umtcems/
│   ├── UMTCEMSApplication.java      # Main class - RUN THIS
│   ├── config/
│   │   └── CorsConfig.java          # Allows React to connect
│   ├── model/
│   │   ├── User.java                # User entity (JPA)
│   │   ├── Proposal.java             # Proposal entity (JPA)
│   │   ├── Comment.java             # Comment entity (JPA)
│   │   ├── PostEventReport.java     # Report entity (JPA)
│   │   ├── UserRole.java            # Enum: CLUB_REP, ADVISOR, MPP_EXCO, HEPA_STAFF
│   │   └── ProposalStatus.java      # Enum: PENDING_ADVISOR, APPROVED, etc.
│   ├── repository/
│   │   ├── UserRepository.java      # Auto-generates SQL for users
│   │   ├── ProposalRepository.java  # Auto-generates SQL for proposals
│   │   ├── CommentRepository.java   # Auto-generates SQL for comments
│   │   └── PostEventReportRepository.java
│   └── controller/
│       ├── UserController.java      # HABAN fills this
│       ├── ProposalController.java  # ALYSSA fills this
│       └── ReportController.java    # AIDIL fills this
└── src/main/resources/
    └── application.properties       # DB connection config
```

---

## Individual Tasks

### HABAN → UserController.java

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users/register` | POST | Register new user |
| `/api/users/login` | POST | Login |
| `/api/users/{id}/password` | PUT | Change password |
| `/api/users/{id}/email` | PUT | Update email |

### ALYSSA → ProposalController.java

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/proposals` | POST | Submit new proposal |
| `/api/proposals/{id}/approve-advisor` | PUT | Advisor approves |
| `/api/proposals/{id}/request-changes` | PUT | Request amendments |
| `/api/proposals/{id}/approve-mpp` | PUT | MPP final approval |
| `/api/proposals/{id}/reject` | PUT | MPP rejects |
| `/api/proposals/{id}/resubmit` | PUT | Club rep resubmits |
| `/api/proposals/{id}/comments` | POST | Add comment |

### AIDIL → ReportController.java

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/reports` | POST | Submit post-event report |
| `/api/reports/analytics` | GET | Get statistics |
| `/api/reports/venue-clashes` | GET | Check date/venue conflicts |
| `/api/reports/pending` | GET | List approved events pending report |

---

## How JPA Works (No SQL Writing!)

Instead of writing SQL, you call repository methods:

```java
// Instead of: SELECT * FROM users WHERE email = 'x'
userRepository.findByEmail("x");

// Instead of: SELECT * FROM proposals WHERE status = 'APPROVED'
proposalRepository.findByStatus(ProposalStatus.APPROVED);

// Instead of: INSERT INTO users VALUES (...)
userRepository.save(user);

// Instead of: DELETE FROM proposals WHERE id = 1
proposalRepository.deleteById(1L);
```

JPA automatically generates the SQL based on method names!

---

## Testing Your API

### Using curl:

```bash
# Register a user
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali","email":"ali@umt.edu.my","password":"123","role":"CLUB_REP","clubName":"CS Club"}'

# Get all users
curl http://localhost:8080/api/users
```

### Using Postman:
1. Create new HTTP Request
2. Set method and URL
3. For POST/PUT: Set Body → raw → JSON
4. Send!

---

## Common Errors

### "Communications link failure"
→ MySQL not running. Start XAMPP.

### "Access denied for user 'root'"
→ Wrong password in application.properties. Fix it.

### "Unknown database 'umtcems'"
→ Database doesn't exist. Run CREATE DATABASE umtcems;

### "Table 'proposals' doesn't exist"
→ JPA hasn't created it yet. Start the app and it will auto-create tables.

### "CORS error" in browser console
→ CorsConfig.java not loaded. Make sure it's in the right package.

---

## Tips

1. **Start MySQL FIRST** before running Spring Boot
2. **Check phpMyAdmin** to see if tables were created
3. **Use @Autowired** to inject repositories into controllers
4. **Return ResponseEntity** for proper HTTP status codes
5. **Use Map<String, Object>** for flexible JSON request bodies

---

## Still Confused?

1. Read the TODO comments in each controller file
2. Check Spring Data JPA documentation for method naming conventions
3. Ask during lab session
4. Look at example Spring Boot tutorials online
