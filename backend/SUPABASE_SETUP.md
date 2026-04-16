# Supabase Setup — For Haban & Alyssa

I (Aidil) set up the database. Here's how to connect.

---

## Connection Info

```
postgresql://postgres:Umtcems2105_.@db.kdxjgjfmsncsrvfskhre.supabase.co:5432/postgres
```

> ⚠️ Password ends with a `.` — copy it exactly.

---

## Your application.properties

1. Copy `backend/src/main/resources/application.properties.template` → `application.properties`
2. Replace the values with these:

```properties
spring.datasource.url=jdbc:postgresql://db.kdxjgjfmsncsrvfskhre.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=Umtcems2105_.
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

3. Save. It's gitignored — safe to keep local.

---

## Run the Backend

```bash
cd UMTCEMS/backend
mvn spring-boot:run
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
| `Access denied` | Password wrong — make sure it's `Umtcems2105_.` with the dot |
| Tables don't exist | Normal on first run. JPA creates them automatically |
| Maven seems stuck | First run takes 2-5 mins. Don't close it |

---

Ping me (Aidil) in WhatsApp if you're stuck.
