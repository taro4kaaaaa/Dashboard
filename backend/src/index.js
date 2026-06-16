const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    service: "Dashboard API",
    status: "ok",
  });
});

app.get("/services", (req, res) => {
  res.json([
  {
    "id": "1",
    "title": "Docker Setup",
    "status": "todo",
    "priority": "high",
    "createdAt": "2025-06-15"
  },
  {
    "id": "2",
    "title": "Configure Nginx",
    "status": "in-progress",
    "priority": "medium",
    "createdAt": "2025-06-15"
  },
  {
    "id": "3",
    "title": "Redis",
    "status": "in-progress",
    "priority": "medium",
    "createdAt": "2025-06-15"
  }
]);
});

app.listen(3000, () => {
  console.log("API started on port 3000");
});