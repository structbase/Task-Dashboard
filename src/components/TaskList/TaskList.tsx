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
            <div>
                <div>
                    <h5>No tasks found</h5>
                    <p>Create new Task or try adjusting your filters</p>
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
