import type {
  Task,
  TaskStatus,
} from "@/entities/task/model/types";
import { tasksApi } from "@/api/tasksApi";

interface Props {
  task: Task;
}

export const TaskRow = ({ task }: Props) => {
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
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
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

  const handleDelete = async () => {
    if (!confirm("Удалить задачу?")) return;

    try {
      await tasksApi.delete(task.id);

      window.location.reload();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleStatusChange = async (
    status: TaskStatus
  ) => {
    try {
      await tasksApi.updateStatus(
        task.id,
        status
      );

      window.location.reload();
    } catch (error) {
      console.error(
        "Failed to update task:",
        error
      );
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
              handleStatusChange(
                e.target.value as TaskStatus
              )
            }
          >
            <option value="todo">Todo</option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="done">Done</option>
          </select>
        </div>
      </td>

      <td>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            background: getPriorityColor(
              task.priority
            ),
            color: "white",
            fontSize: "12px",
          }}
        >
          {formatPriority(task.priority)}
        </span>
      </td>

      <td>
        <button
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "4px 8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};