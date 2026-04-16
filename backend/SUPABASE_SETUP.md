# Setting Up Supabase PostgreSQL (For Team of 3)

## Why Supabase?

- **Free tier**: 500MB storage, 2GB transfer/month on free plan
- PostgreSQL — robust, reliable, no version churn
- Connection string shared once — all 3 teammates use the same DB
- No credit card required for free tier

---

## Step 1: One Person Sets Up Supabase (Already Done)

The Supabase project has already been created:

- **Connection URL**: `postgresql://postgres:[Umtcems2105_.]@db.kdxjgjfmsncsrvfskhre.supabase.co:5432/postgres`
- Share this with Alyssa and Haban via WhatsApp/Discord

> **What each person needs from this string:**
> - Host: `db.kdxjgjfmsncsrvfskhre.supabase.co`
> - Port: `5432`
> - Database: `postgres`
> - Username: `postgres`
> - Password: `Umtcems2105_.`

---

## Step 2: Everyone Updates Their application.properties

1. Copy `backend/src/main/resources/application.properties.template` to `application.properties`
2. Fill in the connection details:

```properties
spring.datasource.url=jdbc:postgresql://db.kdxjgjfmsncsrvfskhre.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=Umtcems2105_.
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

> ⚠️ `application.properties` is gitignored — it will never be committed with your credentials.

---

## Step 3: Run the Backend (Tables Auto-Create)

Everyone runs:
```bash
cd backend
mvn spring-boot:run
```

JPA will auto-create all tables (`ddl-auto=update`). No manual SQL needed for schema.

---

## Step 4: Run the Seed Data (One Time Only)

Only ONE person runs this once in the Supabase SQL Editor:

1. Go to [supabase.com](https://supabase.com) → your project → **SQL Editor**
2. Copy-paste the contents of `backend/src/main/resources/seed-data.sql`
3. Click **Run**

This populates the initial roles and users.

---

## Troubleshooting

### Connection refused
- Check your `application.properties` password matches exactly
- Make sure Supabase project is active (not paused)
- Free tier can spin down after inactivity — log in to Supabase dashboard to wake it

### Password has special characters
- The password `Umtcems2105_.` has a `.` at the end — this should be fine in JDBC URL
- If you ever need to encode: `@` → `%40`, `#` → `%23`, `/` → `%2F`

### Tables not created
- Make sure `spring.jpa.hibernate.ddl-auto=update` is set
- Restart the Spring Boot app
- Check Maven console output for Hibernate SQL statements

### Supabase Dashboard SQL Editor
- Found at: https://supabase.com/dashboard → select project → **SQL Editor**
- Use this to run raw SQL, check data, or manually insert records

---

## Supabase Free Tier Limits

| Resource | Free Limit |
|----------|-----------|
| Storage | 500MB |
| Transfer | 2GB/month |
| Databases | 1 |
| Row level security | Enabled |
| API requests | 500K/month |

For a 3-person student dev team: **more than enough** for the semester.

---

## Stopping / Pausing

Supabase free tier can become inactive after a period of inactivity. If the DB stops responding:
1. Log in to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. The project should wake up automatically when you next run the backend
