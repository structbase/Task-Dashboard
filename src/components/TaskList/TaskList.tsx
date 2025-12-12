import React from "react";
import { TaskItem } from "./TaskItem";
import type { TaskListProps } from "../types";

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onStatusChange,
    onDelete,
}) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-info" role="alert">
                    <h5 className="alert-heading">No tasks found</h5>
                    <p className="mb-0">Create a new task or try adjusting your filters</p>
                </div>
            </div>
        );
    }
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
