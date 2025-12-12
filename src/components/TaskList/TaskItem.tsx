import React from "react";
import type { TaskItemProps, TaskStatus } from "../types";

export const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onStatusChange,
    onDelete,
}) => {
    // Format date for display
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Capitalize first letter for display
    const capitalize = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Get Bootstrap badge class based on status
    const getStatusBadgeClass = (status: string): string => {
        switch (status) {
            case "pending":
                return "bg-warning";
            case "in-progress":
                return "bg-primary";
            case "completed":
                return "bg-success";
            default:
                return "bg-secondary";
        }
    };

    // Get Bootstrap badge class based on priority
    const getPriorityBadgeClass = (priority: string): string => {
        switch (priority) {
            case "high":
                return "bg-danger";
            case "medium":
                return "bg-warning";
            case "low":
                return "bg-success";
            default:
                return "bg-secondary";
        }
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">{task.title}</h5>
                    <span
                        className={`badge ${getStatusBadgeClass(task.status)}`}
                    >
                        {capitalize(task.status.replace("-", " "))}
                    </span>
                </div>

                {task.description && (
                    <p className="card-text text-muted mb-3">
                        {task.description}
                    </p>
                )}

                <div className="d-flex flex-wrap gap-3 mb-3">
                    <div>
                        <strong>Due Date:</strong>{" "}
                        <span className="text-muted">
                            {formatDate(task.dueDate)}
                        </span>
                    </div>
                    <div>
                        <strong>Priority:</strong>{" "}
                        <span
                            className={`badge ${getPriorityBadgeClass(
                                task.priority
                            )}`}
                        >
                            {capitalize(task.priority)}
                        </span>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <select
                        className="form-select form-select-sm"
                        style={{ maxWidth: "200px" }}
                        value={task.status}
                        onChange={(e) =>
                            onStatusChange(
                                task.id,
                                e.target.value as TaskStatus
                            )
                        }
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
