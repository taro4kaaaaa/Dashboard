import { useTaskStore } from "@/entities/task/model/store";
import { TaskRow } from "./TaskRow";

export const TaskTable = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Статус</th>
          <th>Приоритет</th>
          <th>Действия</th>
        </tr>
      </thead>

      <tbody>
        {filteredTasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
};