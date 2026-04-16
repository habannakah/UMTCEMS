# Setting Up Railway Cloud MySQL (For Team of 3)

## Why Railway?

- Free 500hrs/month — enough for active development
- Shared MySQL so all 3 teammates use the same database
- No need to manually sync SQL files or export/import data

---

## Step 1: One Person Creates the Railway Project

> Only ONE person does this — then shares the connection string with the team.

1. Go to [railway.app](https://railway.app) → Sign up with GitHub
2. Click **New Project** → **Provision MySQL**
3. Wait for MySQL to start → Click on it
4. Go to the **Variables** tab → Copy the `MYSQL_URL` value
   - It looks like: `mysql://root:abc123def@mysql.railway.internal:3306/railway`
5. Share this connection string with Alyssa and Haban via WhatsApp/Discord

---

## Step 2: Everyone Updates Their application.properties

1. Copy `application.properties.template` to `application.properties`
2. Replace the URL and password with the shared Railway connection string

Example:
```properties
# Railway
spring.datasource.url=jdbc:mysql://mysql.railway.internal:3306/railway
spring.datasource.username=root
spring.datasource.password=abc123def
```

> ⚠️ The database name from Railway is `railway` by default, not `umtcems`. 
> Change it if your JPA entities use a different DB name, OR create a DB named `umtcems` in the Railway MySQL console.

---

## Step 3: Run the Backend

Everyone runs:
```bash
cd backend
mvn spring-boot:run
```

JPA will auto-create all tables (`ddl-auto=update`). One person needs to run the seed data SQL once.

---

## Step 4: Run the Seed Data (One Time Only)

Only ONE person runs this after tables are created:

1. In Railway dashboard → **MySQL** → click **Execute SQL** or open the SQL editor
2. OR import `seed-data.sql` via phpMyAdmin connected to the Railway instance

This populates the initial roles, users, and categories.

---

## Troubleshooting

### Connection refused
- Check the hostname in `MYSQL_URL` matches exactly
- Make sure Railway MySQL is running (green status in dashboard)

### Tables not created
- Make sure `spring.jpa.hibernate.ddl-auto=update` is set
- Restart the Spring Boot app

### Password contains special characters
- URL-encode special chars: `@` becomes `%40`, `#` becomes `%23`
- Or wrap the entire URL in the `spring.datasource.url` value

---

## Stopping Railway When Done

Railway's free tier is based on hours used. When done for the day:
- Go to Railway dashboard → your MySQL → click **Stop**
- Next day: click **Start** to get a new connection URL (host changes!)
- When you restart, you'll need to update `application.properties` with the new host

> Alternatively: keep it running — 500hrs/month is ~20 days of 24hr usage. Dev sessions won't hit the limit.