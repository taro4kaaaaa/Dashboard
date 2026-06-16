import { useTaskStore } from "@/entities/task/model/store";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ITEMS_PER_PAGE = 5;

export const Analytics = () => {
  const tasks = useTaskStore((s) => s.tasks);

  // пагинация
  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = tasks.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  // 📊 статистика по статусам
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  // 📊 статистика по приоритету
  const low = tasks.filter((t) => t.priority === "low").length;
  const medium = tasks.filter((t) => t.priority === "medium").length;
  const high = tasks.filter((t) => t.priority === "high").length;

  // данные для графика (статусы)
  const statusData = {
    labels: ["Todo", "In Progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [todo, inProgress, done],
        backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"],
      },
    ],
  };

  // данные для графика (приоритет)
  const priorityData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Priority",
        data: [low, medium, high],
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Аналитика задач</h2>

      {/* 🔥 ДВЕ ДИАГРАММЫ */}
      <div 
        style={{

          display: "flex",
          gap: "100px",
          marginBottom: "30px",
        }}
      >
        <div style={{ width: "300px" }}>
          <h4>По статусам</h4>
          <Pie data={statusData} />
        </div>

        <div style={{ width: "300px" }}>
          <h4>По приоритету</h4>
          <Pie data={priorityData} />
        </div>
      </div>

      {/* 📋 таблица */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Приоритет</th>
          </tr>
        </thead>

        <tbody>
          {paginatedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔢 пагинация */}
      <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              padding: "6px 10px",
              background: page === i + 1 ? "#4f46e5" : "#e5e7eb",
              color: page === i + 1 ? "white" : "black",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};