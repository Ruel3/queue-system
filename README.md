# USIU-Africa Health Centre — Queue Management System

A working prototype of the system described in the mid-term proposal: students join a
digital queue for one of six clinic departments and track their position remotely;
clinic staff call the next patient and assign consultation rooms from a live dashboard.

- **Backend:** Node.js + Express, data stored in a local JSON file (`backend/data/db.json`) — no database install needed.
- **Frontend:** React (Vite), polling the API every 4 seconds for live updates.

## 1. Open the project in VS Code

Unzip the project, then in VS Code: **File → Open Folder…** → select the `queue-system` folder.
Open an integrated terminal (`` Ctrl+` ``) — you'll run two of them, one per server.

## 2. Install dependencies

```bash
cd backend
npm install
```

Open a **second terminal** (`+` icon in the terminal panel):

```bash
cd frontend
npm install
```

## 3. Run it

**Terminal 1 — backend** (http://localhost:4000):
```bash
cd backend
npm run dev
```

**Terminal 2 — frontend** (http://localhost:5173):
```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser. The frontend proxies `/api/*` calls to
the backend automatically (see `frontend/vite.config.js`), so both must be running.

## 4. Try it out

**As a student:**
1. Choose "Student". Only `@usiu.ac.ke` email addresses can register or sign in — anything else is rejected by the server, not just the form.
2. Use the demo account (**Sign in** tab): email `sleonce@usiu.ac.ke`, password `student123`. Or click **Register** to create a new account with any `@usiu.ac.ke` email.
3. Pick a department. You'll get a digital ticket showing your number, position, and estimated wait.

**As clinic staff:**
1. Open the app in a second browser tab (or an incognito window, so you're not signed in as the same student).
2. Choose "Clinic staff". Demo accounts: `staff1` or `staff2`, password `clinic123`.
3. Select a department, click **Call next**, then assign the called student to a room.
4. Watch the student's tab update automatically within a few seconds — no refresh needed.

## Project structure

```
queue-system/
├── backend/
│   ├── server.js              Express app entry point
│   ├── data/db.json           Auto-created on first run (students, staff, tickets)
│   └── src/
│       ├── db.js              JSON file read/write helpers + seed data
│       └── routes/
│           ├── auth.js        Student & staff login
│           ├── queue.js       Join queue, check status, cancel (student-facing)
│           └── staff.js       View queues, call next, assign room (staff-facing)
└── frontend/
    └── src/
        ├── api.js             Fetch wrapper for the backend API
        ├── App.jsx            Session handling + routing between views
        ├── pages/
        │   ├── Login.jsx
        │   ├── StudentDashboard.jsx
        │   └── StaffDashboard.jsx
        └── components/
            ├── TicketStub.jsx     The digital queue ticket
            ├── DepartmentGrid.jsx
            └── QueueTable.jsx
```

## Notes on scope (matches the proposal's "Constraints" section)

- **Auth is simulated**, not real university SSO — appropriate for a prototype built by a
  small student team in one semester, per the proposal's constraints. Access is still
  restricted: registration and sign-in are enforced server-side to require an
  `@usiu.ac.ke` email address (see `backend/src/auth-helpers.js` to change the domain),
  and passwords are salted and hashed rather than stored in plain text.
- **Storage is a JSON file**, not MySQL/PostgreSQL, so there's nothing to install to run
  this. Swapping in a real database later mainly means rewriting `backend/src/db.js`;
  the routes wouldn't need to change.
- **Real-time updates use polling** (every 4 seconds) rather than WebSockets — simpler to
  run and explain, at the cost of a few seconds of lag versus true push updates.
- Emergency cases, medical records, billing, and a mobile app are out of scope, as stated
  in the proposal.

## Resetting demo data

Delete `backend/data/db.json` and restart the backend — it will reseed with the two
demo students and two demo staff accounts from the proposal.
