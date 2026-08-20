const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5082;
const DATA_DIR = path.join(__dirname, "data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(WAITLIST_FILE)) {
  fs.writeFileSync(WAITLIST_FILE, "[]\n");
}

app.use(express.json({ limit: "64kb" }));
app.use(express.static(path.join(__dirname, "public"), {
  extensions: ["html"],
  maxAge: process.env.NODE_ENV === "production" ? "1h" : 0
}));

function readWaitlist() {
  try {
    return JSON.parse(fs.readFileSync(WAITLIST_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeWaitlist(entries) {
  fs.writeFileSync(WAITLIST_FILE, `${JSON.stringify(entries, null, 2)}\n`);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post("/api/waitlist", (req, res) => {
  const email = normalizeEmail(req.body.email);
  const dogName = String(req.body.dogName || "").trim().slice(0, 80);
  const dogBirthday = String(req.body.dogBirthday || "").trim().slice(0, 32);
  const source = String(req.body.source || "landing").trim().slice(0, 80);

  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "Enter a valid email." });
  }

  const entries = readWaitlist();
  const existing = entries.find((entry) => entry.email === email);
  const payload = {
    email,
    dogName,
    dogBirthday,
    source,
    userAgent: req.get("user-agent") || "",
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existing) {
    Object.assign(existing, payload);
  } else {
    entries.push(payload);
  }

  writeWaitlist(entries);
  res.json({ ok: true, count: entries.length });
});

app.get("/api/waitlist.csv", (_req, res) => {
  const entries = readWaitlist();
  const rows = [
    ["email", "dogName", "dogBirthday", "source", "createdAt", "updatedAt"],
    ...entries.map((entry) => [
      entry.email,
      entry.dogName,
      entry.dogBirthday,
      entry.source,
      entry.createdAt,
      entry.updatedAt
    ])
  ];
  const csv = rows.map((row) =>
    row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")
  ).join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=pawdiac-waitlist.csv");
  res.send(`${csv}\n`);
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, app: "pawdiac-landing" });
});

app.listen(PORT, () => {
  console.log(`Pawdiac landing running on http://localhost:${PORT}`);
});
