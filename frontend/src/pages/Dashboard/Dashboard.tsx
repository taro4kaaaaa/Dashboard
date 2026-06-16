import { useEffect } from "react";
import { useTaskStore } from "@/entities/task/model/store";

import { TaskTable } from "@/widgets/TaskTable/TaskTable";
import { Filters } from "@/widgets/Filters/Filters";
import { AddTaskForm } from "@/widgets/AddTaskForm/AddTaskForm";

import "./Dashboard.css";

export const Dashboard = () => {
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container">
      <h1>Информационная панель</h1>
      <AddTaskForm />
      <Filters />
      <TaskTable />
    </div>
  );
};