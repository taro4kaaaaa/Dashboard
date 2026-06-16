import { useTaskStore } from "@/entities/task/model/store";
import "./Filters.css"

export const Filters = () => {
  const setFilter = useTaskStore((state) => state.setFilter);

  return (
    <div className="filters">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("todo")}>Todo</button>
      <button onClick={() => setFilter("in-progress")}>In Progress</button>
      <button onClick={() => setFilter("done")}>Done</button>
    </div>
  );
};