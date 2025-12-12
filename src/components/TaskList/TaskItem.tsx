import React from "react";
import type { TaskItemProps, TaskStatus } from "../types";

export const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onStatusChange,
    onDelete,
}) => {
    return (
        <div className="card mb-3">
            <div>
                <h4>{task.title}</h4>
                <span></span>
            </div>
            <div>
                <p>{task.description}</p>
                <div>
                    <div>Due Date: </div> {""}
                    <span>{task.dueDate}</span>
                </div>
                <div>
                    <strong>Priority:</strong>
                    <span></span>
                </div>
            </div>

            <div>
                <select
                    className=""
                    value={task.status}
                    onChange={(e) =>
                        onStatusChange(task.id, e.target.value as TaskStatus)
                    }
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button className="" onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};
