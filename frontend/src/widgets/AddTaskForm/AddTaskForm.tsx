import { useState } from "react";
import { tasksApi } from "@/api/tasksApi";

export const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      status: "todo" as const,
      priority,
      createdAt: new Date().toISOString(),
    };

    try {
      await tasksApi.create(newTask);

      setTitle("");
      setPriority("low");

      // временно обновляем страницу
      window.location.reload();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "low" | "medium" | "high")
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Добавить</button>
    </form>
  );
};