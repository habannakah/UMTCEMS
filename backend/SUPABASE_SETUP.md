# Supabase Setup Guide — For Haban & Alyssa

Hey! I (Aidil) set up the database for us so we can all work on the same data. Here's how to get it running on your laptop.

---

## What You Need

- Node.js installed
- Java 17+ installed
- Git installed

That's it — no XAMPP, no local MySQL. Everything is on Supabase.

---

## Step 1: Get the Connection String

I already set up the Supabase project. Here's the connection info:

```
postgresql://postgres:[Umtcems2105_.]@db.kdxjgjfmsncsrvfskhre.supabase.co:5432/postgres
```

Or if you prefer the breakdown:
- **Host**: `db.kdxjgjfmsncsrvfskhre.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **Username**: `postgres`
- **Password**: `Umtcems2105_.`

> **⚠️ Important**: This password has a `.` at the end. Make sure you copy it exactly, including the dot.

---

## Step 2: Set Up Your application.properties

1. Go to `backend/src/main/resources/`
2. Copy `application.properties.template` → paste it as `application.properties`
3. Open the new `application.properties` and replace the placeholder values with the ones above:

```properties
spring.datasource.url=jdbc:postgresql://db.kdxjgjfmsncsrvfskhre.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=Umtcems2105_.
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

4. Save the file. Don't commit this file — it's gitignored so your password stays local.

---

## Step 3: Run the Backend

```bash
cd UMTCEMS/backend
mvn spring-boot:run
```

Give it a minute. On the first run, Maven downloads a bunch of dependencies — it's not stuck, just slow. Wait until you see:

```
Started UMTCEMSApplication in X.XX seconds
```

If you see errors about connecting to Supabase, double-check your password is copied exactly (including the `.` at the end).

---

## Step 4: Run the Seed Data (One Time Only)

One person needs to do this — not all three. I'll probably do it, but if something goes wrong here's how:

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → select our project → **SQL Editor**
2. Copy everything from `backend/src/main/resources/seed-data.sql` and paste it in
3. Click **Run**

This creates our initial users (admin, HOD, students) so we can actually log in and test.

---

## Stuff to Know

### Supabase Free Tier
- 500MB storage
- 2GB transfer/month
- No credit card needed

For three people doing dev work? More than enough for the semester.

### If the DB Stops Responding
Supabase free tier spins down after a while of inactivity. If the backend suddenly can't connect:
1. Open [supabase.com/dashboard](https://supabase.com/dashboard) and log in
2. Just visiting the dashboard wakes the project back up
3. Run `mvn spring-boot:run` again

### About the Password
`Umtcems2105_.` — the `.` at the end is part of the password, not a file extension. When you paste it into `application.properties`, it should look exactly like that.

---

## Common Problems

| Error | Fix |
|-------|-----|
| `Connection refused` | Log into supabase.com/dashboard to wake the project up, then try again |
| `Access denied for user 'postgres'` | Your password is wrong. Make sure you copied `Umtcems2105_.` exactly — with the dot at the end |
| `Table 'users' doesn't exist` | Normal on first run. JPA creates it automatically. Just run the backend again |
| Maven seems stuck | First run takes 2-5 minutes. Don't close the window |

---

## Questions?

Just ping me (Aidil) in WhatsApp and I'll sort it out.
