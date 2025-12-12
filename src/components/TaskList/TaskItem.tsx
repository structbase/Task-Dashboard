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

    // Get status badge color
    const getStatusColor = (status: string): string => {
        switch (status) {
            case "pending":
                return "#ffc107"; // Yellow
            case "in-progress":
                return "#0d6efd"; // Blue
            case "completed":
                return "#198754"; // Green
            default:
                return "#6c757d"; // Gray
        }
    };

    // Get priority badge color
    const getPriorityColor = (priority: string): string => {
        switch (priority) {
            case "high":
                return "#dc3545"; // Red
            case "medium":
                return "#ffc107"; // Yellow
            case "low":
                return "#198754"; // Green
            default:
                return "#6c757d"; // Gray
        }
    };

    // Capitalize first letter for display
    const capitalize = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="card mb-3">
            <div>
                <h4>{task.title}</h4>
                <span
                    style={{
                        backgroundColor: getStatusColor(task.status),
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        marginLeft: "10px",
                    }}
                >
                    {capitalize(task.status.replace("-", " "))}
                </span>
            </div>
            <div>
                <p>{task.description}</p>
                <div>
                    <div>
                        <strong>Due Date:</strong> {formatDate(task.dueDate)}
                    </div>
                </div>
                <div>
                    <strong>Priority:</strong>
                    <span
                        style={{
                            backgroundColor: getPriorityColor(task.priority),
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            marginLeft: "10px",
                        }}
                    >
                        {capitalize(task.priority)}
                    </span>
                </div>
            </div>

            <div>
                <select
                    value={task.status}
                    onChange={(e) =>
                        onStatusChange(task.id, e.target.value as TaskStatus)
                    }
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};
