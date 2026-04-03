# 🎓 Anurag University — Exam Hall Locator System

A full-stack web application for managing exam hall allocations and sending notifications to students.

---

## 📁 Project Structure

```
examhall-backend/     ← Spring Boot REST API (Java 17, Maven)
examhall-frontend/    ← React app (CRA, Axios, React Router)
```

---

## 🗄️ Step 1: Set Up Free Cloud Database (Neon PostgreSQL)

### Option A — Neon (Recommended, Free)
1. Go to **https://neon.tech** and sign up for free
2. Create a new project → name it `examhall`
3. Select region closest to you
4. Copy the **Connection string** — it looks like:
   ```
   postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. Convert to JDBC format:
   ```
   jdbc:postgresql://ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Option B — Supabase (Free)
1. Go to **https://supabase.com** → New project
2. Go to **Settings → Database**
3. Copy the **Connection string (URI)** and convert to JDBC format

### Option C — Railway (Free tier)
1. Go to **https://railway.app** → New Project → PostgreSQL
2. Click on the DB → **Connect** → copy the connection details

---

## 📱 Step 2: Set Up Twilio SMS (Optional)

1. Sign up at **https://www.twilio.com**
2. Get a **free trial phone number**
3. From the Twilio Console, copy:
   - **Account SID** (starts with `AC...`)
   - **Auth Token**
   - **Phone Number** (format: `+1XXXXXXXXXX`)

> ⚠️ **Note:** SMS is optional. Without Twilio credentials, the app works fully — notifications just appear in the portal only.

---

## ⚙️ Step 3: Run Backend Locally

### Prerequisites
- Java 17+
- Maven 3.8+

### Setup
```bash
cd examhall-backend

# Copy the env example
cp .env.example .env
# Edit .env with your real values
```

### Set environment variables (Linux/Mac)
```bash
export DB_URL="jdbc:postgresql://your-host/your-db?sslmode=require"
export DB_USER="your_db_user"
export DB_PASS="your_db_password"
export JWT_SECRET="your_super_long_jwt_secret_key_at_least_32_chars"
export TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxx"
export TWILIO_AUTH_TOKEN="your_twilio_auth_token"
export TWILIO_PHONE_NUMBER="+1xxxxxxxxxx"
export CORS_ALLOWED_ORIGINS="http://localhost:3000"
```

### Set environment variables (Windows PowerShell)
```powershell
$env:DB_URL="jdbc:postgresql://your-host/your-db?sslmode=require"
$env:DB_USER="your_db_user"
$env:DB_PASS="your_db_password"
$env:JWT_SECRET="your_super_long_jwt_secret_key_at_least_32_chars"
$env:CORS_ALLOWED_ORIGINS="http://localhost:3000"
```

### Run
```bash
mvn clean package -DskipTests
java -jar target/examhall.jar
```

Backend runs at: **http://localhost:8080**

---

## 💻 Step 4: Run Frontend Locally

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
cd examhall-frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:8080" > .env

npm start
```

Frontend runs at: **http://localhost:3000**

---

## 🚀 Step 5: Deploy Backend to Render

1. Push `examhall-backend/` to a **GitHub repository**

2. Go to **https://render.com** → Sign up → **New Web Service**

3. Connect your GitHub repo

4. Configure the service:
   | Field | Value |
   |-------|-------|
   | **Runtime** | Java |
   | **Build Command** | `mvn clean package -DskipTests` |
   | **Start Command** | `java -Dserver.port=$PORT -jar target/examhall.jar` |
   | **Instance Type** | Free |

5. Add **Environment Variables** in the Render dashboard:

   | Key | Value |
   |-----|-------|
   | `DB_URL` | Your JDBC PostgreSQL URL |
   | `DB_USER` | Your DB username |
   | `DB_PASS` | Your DB password |
   | `JWT_SECRET` | A long random secret (32+ chars) |
   | `TWILIO_ACCOUNT_SID` | Your Twilio SID (or leave empty) |
   | `TWILIO_AUTH_TOKEN` | Your Twilio token (or leave empty) |
   | `TWILIO_PHONE_NUMBER` | Your Twilio phone (or leave empty) |
   | `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

6. Click **Deploy** → Wait 3–5 minutes

7. Copy your Render backend URL: `https://examhall-backend.onrender.com`

> ⏱️ **Free Render instances spin down after 15 min of inactivity.** First request may take 30–60 seconds to wake up.

---

## 🌐 Step 6: Deploy Frontend to Vercel

1. Push `examhall-frontend/` to a **GitHub repository**

2. Go to **https://vercel.com** → Sign up → **New Project**

3. Import your frontend GitHub repo

4. Configure:
   | Field | Value |
   |-------|-------|
   | **Framework Preset** | Create React App |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `build` |

5. Add **Environment Variable**:
   | Key | Value |
   |-----|-------|
   | `REACT_APP_API_URL` | `https://your-backend.onrender.com` |

6. Click **Deploy**

7. Your app is live at: `https://your-app.vercel.app`

---

## 🔗 Step 7: Connect Frontend ↔ Backend

1. Go back to **Render** → Your backend service → **Environment**
2. Update `CORS_ALLOWED_ORIGINS` to your Vercel URL:
   ```
   https://your-app.vercel.app
   ```
3. Click **Save Changes** → Render will redeploy automatically

---

## 📡 API Endpoints Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/admin/signup` | Admin registration |
| POST | `/api/auth/admin/login` | Admin login |
| POST | `/api/auth/student/signup` | Student registration |
| POST | `/api/auth/student/login` | Student login |

### Admin (requires ADMIN token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/students` | All students |
| GET | `/api/admin/students/branch/{branch}` | Students by branch |
| GET | `/api/admin/students/branch/{b}/section/{s}` | Students by branch+section |
| POST | `/api/admin/allocate` | Allocate exam hall |
| GET | `/api/admin/allocations` | All allocations |
| GET | `/api/admin/allocations/branch/{branch}` | Allocations by branch |
| DELETE | `/api/admin/allocations/{id}` | Delete allocation |
| POST | `/api/admin/notify` | Send notification |
| GET | `/api/admin/notifications` | All notifications |

### Student (requires STUDENT token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/profile` | Student profile |
| GET | `/api/student/hall-allocation` | Student's hall allocation |
| GET | `/api/student/notifications` | Student's notifications |

---

## 🔒 Authentication Flow

- JWT tokens are returned on login/signup
- Frontend stores token in `localStorage`
- Token is sent in `Authorization: Bearer <token>` header
- Token expires in 24 hours (configurable via `JWT_EXPIRATION`)

---

## 🗃️ Database Tables

The following tables are auto-created by Hibernate on first startup:

| Table | Description |
|-------|-------------|
| `admins` | Admin accounts |
| `students` | Student records |
| `hall_allocations` | Exam hall assignments |
| `notifications` | Sent notifications |

---

## 🧪 Testing the App

### 1. Register Admin
- Go to `/admin/signup`
- Enter name, email, password
- You're logged in and redirected to dashboard

### 2. Register Students
- Go to `/student/signup`
- Enter roll number, name, branch (CSE/ECE/EEE/MECH/CIVIL), section, year, phone, password

### 3. Allocate Hall (as Admin)
- Go to Admin → Allocate Hall
- Select branch, section, roll range, hall name, room, subject
- Submit

### 4. Send Notification (as Admin)
- Go to Admin → Send Notification
- Choose "Entire Branch" or "Specific Students"
- Enter message, date, time
- Optionally enable SMS

### 5. View as Student
- Login as student
- See hall allocation and notifications on dashboard

---

## 🛠️ Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Backend | Spring Boot 3.2, Java 17 |
| Security | Spring Security + JWT |
| Database | PostgreSQL (Neon/Supabase/Railway) |
| ORM | Spring Data JPA / Hibernate |
| SMS | Twilio SDK |
| Frontend | React 18, React Router v6 |
| HTTP Client | Axios |
| Toast | React Hot Toast |
| Backend Deploy | Render |
| Frontend Deploy | Vercel |

---

## 🐛 Common Issues & Fixes

### ❌ CORS Error
- Make sure `CORS_ALLOWED_ORIGINS` in backend matches your frontend URL exactly (no trailing slash)

### ❌ Database Connection Failed
- Verify your JDBC URL format: `jdbc:postgresql://host/dbname?sslmode=require`
- Neon requires `sslmode=require`

### ❌ JWT Token Invalid
- Make sure `JWT_SECRET` is at least 32 characters
- Tokens expire after 24h — user must re-login

### ❌ SMS Not Sending
- Check Twilio credentials are correct
- Twilio trial accounts can only send to verified numbers
- Check logs: `Twilio SMS service initialized successfully`

### ❌ Render Backend Slow First Load
- Free tier spins down after 15 min of inactivity
- First request takes 30–60s to wake up — this is normal

---

## 📧 Support

For issues, check:
1. Backend logs on Render dashboard
2. Browser Console for frontend errors
3. Network tab in DevTools for API responses

---

*Built for Anurag University — Academic Demo Project 2024*
