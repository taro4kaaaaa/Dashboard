const express = require("express");
const cors = require("cors");
const redisClient = require("./redis");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    service: "Dashboard API",
    status: "ok",
  });
});

app.get("/services", async (req, res) => {
  try {
    const tasks = await redisClient.get("tasks");

    res.json(JSON.parse(tasks || "[]"));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get tasks",
    });
  }
});

async function start() {
  try {
    await redisClient.connect();

    console.log("Redis connected");

    const existingTasks = await redisClient.get("tasks");

    if (!existingTasks) {
      await redisClient.set(
        "tasks",
        JSON.stringify([
          {
            id: "1",
            title: "Docker Setup",
            status: "todo",
            priority: "high",
            createdAt: "2025-06-15",
          },
          {
            id: "2",
            title: "Configure Nginx",
            status: "in-progress",
            priority: "medium",
            createdAt: "2025-06-15",
          },
          {
            id: "3",
            title: "Redis",
            status: "in-progress",
            priority: "medium",
            createdAt: "2025-06-15",
          },
        ])
      );

      console.log("Initial tasks loaded");
    }

    app.listen(3000, () => {
      console.log("API started on port 3000");
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
}

start();