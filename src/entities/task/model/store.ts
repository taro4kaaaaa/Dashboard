import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, TaskStatus } from "./types";

interface TaskStore {
  tasks: Task[];
  filter: "all" | TaskStatus;
  addTask: (task: Task) => void;
  setFilter: (filter: "all" | TaskStatus) => void;
  updateTaskStatus: (id: string, status: Task["status"]) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "1",
          title: "Learn Zustand",
          status: "todo",
          priority: "high",
          createdAt: new Date().toISOString(),
        },
      ],

      filter: "all",

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
    }),
    {
      name: "task-storage",
    }
  )
);