const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const queueRoutes = require("./src/routes/queue");
const staffRoutes = require("./src/routes/staff");
const { getState } = require("./src/db");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// warm the db file on boot
getState();

app.use("/api/auth", authRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/staff", staffRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`USIU Health Centre Queue API running on http://localhost:${PORT}`);
});
