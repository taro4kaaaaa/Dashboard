import type { Task } from "@/entities/task/model/types";
import { useTaskStore } from "@/entities/task/model/store";

interface Props {
  task: Task;
}

export const TaskRow = ({ task }: Props) => {
  const updateTaskStatus = useTaskStore(
    (state) => state.updateTaskStatus
  );
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "#f59e0b";
      case "in-progress":
        return "#3b82f6";
      case "done":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "todo":
        return "Todo";
      case "in-progress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "#ef4444"; // красный
            case "medium":
                return "#f59e0b"; // жёлтый
            case "low":
                return "#10b981"; // зелёный
            default:
                return "#6b7280";
        }
    };

    const formatPriority = (priority: string) => {
        switch (priority) {
            case "high":
                return "High";
            case "medium":
                return "Medium";
            case "low":
                return "Low";
            default:
                return priority;
        }
    };



  return (
    <tr>
      <td>{task.title}</td>

      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "6px",
              background: getStatusColor(task.status),
              color: "white",
              fontSize: "12px",
            }}
          >
            {formatStatus(task.status)}
          </span>

          <select
            value={task.status}
            onChange={(e) =>
              updateTaskStatus(task.id, e.target.value as any)
            }
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </td>

      <td>
            <span
                style={{
                padding: "4px 8px",
                borderRadius: "6px",
                background: getPriorityColor(task.priority),
                color: "white",
                fontSize: "12px",
                }}
                >
                {formatPriority(task.priority)}
            </span>
       </td>

      <td>
        <button
          style={{ background: "#ef4444", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}
          onClick={() => {
            if (confirm("Удалить задачу?")) {
              deleteTask(task.id);
            }
          }}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};