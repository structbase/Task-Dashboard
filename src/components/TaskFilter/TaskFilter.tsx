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
        onFilterChange({
            status: newStatus === "all" ? undefined : newStatus,
            priority: priorityFilter === "all" ? undefined : priorityFilter,
        });
    };

    // handle priority change
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = e.target.value as "low" | "medium" | "high" | "all";
        setPriorityFilter(newPriority);

        onFilterChange({
            status: statusFilter === "all" ? undefined : statusFilter,
            priority: newPriority === "all" ? undefined : newPriority,
        });
    };
    return (
        <div>
            <div>
                <div>
                    <div>
                        <label htmlFor="">Status</label>
                        <select
                            value={statusFilter}
                            onChange={handleStatusChange}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">All Statuses</option>
                            <option value="In-Progress">All Statuses</option>
                            <option value="Completed">All Statuses</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Priority</label>
                        <select
                            value={priorityFilter}
                            onChange={handlePriorityChange}
                        >
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
