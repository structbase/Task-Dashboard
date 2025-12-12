import React from "react";
import type { TaskFilterProps, TaskStatus } from "../types";

export const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
    // local state status filter dropdown
    const [statusFilter, setStatusFilter] = React.useState<TaskStatus | "all">(
        "all"
    );

    // local state  priority filter dropdown
    const [priorityFilter, setPriorityFilter] = React.useState<
        "low" | "medium" | "high" | "all"
    >("all");

    // hangle status change
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as TaskStatus | "all";
        setStatusFilter(newStatus);
        onFilterChange({});
    };

    // handle priority change
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = e.target.value as
            | "low"
            | "medium"
            | "hight"
            | "all";
        setPriorityFilter(newPriority);

        onFilterChange({});
    };
    return (
        <div>
            <div>
                <div>
                    <div>
                        <label htmlFor="">Status</label>
                        <select value={} onChange={}>
                            <option value="All">All Statuses</option>
                            <option value="Pending">All Statuses</option>
                            <option value="In-Progress">All Statuses</option>
                            <option value="Completed">All Statuses</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Priority</label>
                        <select value={} onChange={}>
                            <option value="All">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
