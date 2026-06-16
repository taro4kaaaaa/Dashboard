import { create } from "zustand";
import type { Task, TaskStatus } from "./types";
import { servicesApi } from "../../../api/servisesApi";

interface TaskStore {
  tasks: Task[];
  filter: "all" | TaskStatus;

  loadTasks: () => Promise<void>;

  addTask: (task: Task) => void;
  setFilter: (filter: "all" | TaskStatus) => void;
  updateTaskStatus: (id: string, status: Task["status"]) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  filter: "all",

  loadTasks: async () => {
    try {
      const data = await servicesApi.getAll();

      set({
        tasks: data,
      });
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  },

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  setFilter: (filter) =>
    set(() => ({
      filter,
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));