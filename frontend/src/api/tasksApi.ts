import type { Task } from "@/entities/task/model/types";

const API_URL = "http://localhost:3000";

export const tasksApi = {
  async getAll(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/services`);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return response.json();
  },

  async create(task: Task): Promise<Task> {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    return response.json();
  },
  async delete(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  },
};