const express = require("express");
const cors = require("cors");
const client = require("prom-client");
const redisClient = require("./redis");

const app = express();

app.use(cors());
app.use(express.json());

// Собираем дефолтные метрики Node.js процесса (CPU, память, event loop lag, GC и т.д.)
client.collectDefaultMetrics();

// Счётчик HTTP-запросов с лейблами по методу, роуту и статус-коду
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// Гистограмма латентности запросов
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

// Middleware для метрик — стоит рано, до роутов, чтобы замерять весь цикл запроса
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    const route = req.route ? req.route.path : req.path;
    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode,
    };
    httpRequestCounter.inc(labels);
    end(labels);
  });
  next();
});

// Эндпоинт для Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

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