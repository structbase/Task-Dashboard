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
                <select className="" value={} onChange={}>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
                <button className="" onClick={}>
                    Delete
                </button>
            </div>
        </div>
    );
};
