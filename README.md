# 🕒 Habit Tracker Backend

A **Node.js + PostgreSQL** backend for a Habit Tracking App that helps users stay consistent with their goals by recording, managing, and analyzing habits.  
This backend is built using **Prisma ORM** for database interactions.

---

## ✨ Features
- 👤 **User Authentication** – Register/login with unique usernames and emails.  
- ✅ **Habit Management** – Create, update, activate/deactivate, and delete habits.  
- 🗓 **Track Progress** – Record habit completions (entries) with optional notes.  
- 🏷 **Tags** – Categorize habits (e.g., Fitness, Work, Study).  
- 📊 **Relational Database** – Users, Habits, Entries, and Tags linked with Prisma.  

---

## 🛠 Tech Stack
- **Runtime**: Node.js  
- **Database**: PostgreSQL  
- **ORM**: Prisma  
- **Authentication**: JWT (planned)  

---

## 📂 Database Schema (Prisma)

- **Users** → Account information (email, password, username).  
- **Habit** → Each habit belongs to one user.  
- **Entries** → Habit completion logs.  
- **Tags** → Categories for habits.  
- **HabitTags** → Many-to-many relation between Habits and Tags.  


---

## 🚀 Getting Started

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/yourusername/habit-tracker-backend.git
cd habit-tracker-backend
```
2️⃣ Install Dependencies
```bash
npm install
3️⃣ Setup Database
```bash
Create a .env file and add your PostgreSQL connection:
env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/habittracker"
```
4️⃣ Run Prisma Migrations
```bash
npx prisma migrate dev
```
5️⃣ Start Development Server
```bash
npm run dev
```
📌 API Endpoints (Planned/Implemented)
👤 Users
POST /users/register → Register new user

POST /users/login → Authenticate user

📋 Habits
POST /habits → Create a new habit

GET /habits → Get all habits for a user

PUT /habits/:id → Update habit details

DELETE /habits/:id → Delete a habit

🗓 Entries
POST /habits/:id/entries → Add habit entry

GET /habits/:id/entries → View habit progress

🏷 Tags
POST /tags → Create tag

GET /tags → Get all tags

POST /habits/:id/tags → Attach tag to habit
