import { useState } from "react";
import { useTaskStore } from "@/entities/task/model/store";

export const AddTaskForm = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title,
      status: "todo",
      priority,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setPriority("low");
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