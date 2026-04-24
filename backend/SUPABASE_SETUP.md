# Supabase Setup — For Haban & Alyssa

I (Aidil) set up the database. Here's how to connect.

---

## Connection Info

Use this shared Supabase database connection for local backend development:

```text
postgresql://postgres:Umtcems2105_.@db.kdxjgjfmsncsrvfskhre.supabase.co:5432/postgres
```

---

## Your Environment Variables

`backend/src/main/resources/application.properties` reads the database connection from environment variables.

PowerShell example:

```powershell
$env:SUPABASE_DB_URL="jdbc:postgresql://db.kdxjgjfmsncsrvfskhre.supabase.co:5432/postgres"
$env:SUPABASE_DB_USERNAME="postgres"
$env:SUPABASE_DB_PASSWORD="Umtcems2105_."
```

Set these in the same terminal before running the backend.

---

## Run the Backend

```bash
cd UMTCEMS/backend
./mvnw spring-boot:run
```

First run is slow (Maven downloads everything). Wait for `Started UMTCEMSApplication`.

---

## Seed Data (One Time Only)

I'll do this myself. But if you need to:

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → SQL Editor
2. Paste contents of `seed-data.sql`
3. Click Run

---

## If Something Goes Wrong

| Problem | Fix |
|---------|-----|
| `Connection refused` | Log into supabase.com/dashboard to wake the project up |
| `Access denied` | Check that `SUPABASE_DB_PASSWORD` is copied exactly, including the final dot |
| `Could not resolve placeholder 'SUPABASE_DB_URL'` | Set `SUPABASE_DB_URL` and `SUPABASE_DB_PASSWORD` in the terminal before running |
| Tables don't exist | Normal on first run. JPA creates them automatically |
| Maven seems stuck | First run takes 2-5 mins. Don't close it |

---

Ping me (Aidil) in WhatsApp if you're stuck.
