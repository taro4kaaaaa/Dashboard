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

app.post("/services", async (req, res) => {
  try {
    const newTask = req.body;
    const tasks = JSON.parse(
      (await redisClient.get("tasks")) || "[]"
    );
    tasks.push(newTask);
    await redisClient.set(
      "tasks",
      JSON.stringify(tasks)
    );
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create task",
    });
  }
});

app.delete("/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = JSON.parse(
      (await redisClient.get("tasks")) || "[]"
    );
    const filteredTasks = tasks.filter(
      (task) => task && task.id !== id
    );
    await redisClient.set(
      "tasks",
      JSON.stringify(filteredTasks)
    );
    res.json({
      success: true,
      deletedId: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete task",
    });
  }
});

app.patch("/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const tasks = JSON.parse(
      (await redisClient.get("tasks")) || "[]"
    );
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status }
        : task
    );
    await redisClient.set(
      "tasks",
      JSON.stringify(updatedTasks)
    );
    const updatedTask = updatedTasks.find(
      (task) => task.id === id
    );
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update task",
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