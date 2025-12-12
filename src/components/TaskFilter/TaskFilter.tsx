import React from "react";
import type { TaskFilterProps, TaskStatus, SortOption } from "../types";

/**
 * TaskFilter Component
 * Provides filtering and sorting controls for tasks
 * Includes: status filter, priority filter, search input, and sort dropdown
 */
export const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
    // Local state for status filter dropdown
    const [statusFilter, setStatusFilter] = React.useState<TaskStatus | "all">(
        "all"
    );

    // Local state for priority filter dropdown
    const [priorityFilter, setPriorityFilter] = React.useState<
        "low" | "medium" | "high" | "all"
    >("all");

    // Local state for search input
    const [searchTerm, setSearchTerm] = React.useState<string>("");

    // Local state for sort dropdown
    const [sortOption, setSortOption] = React.useState<SortOption | "">("");

    // Handle status filter change
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as TaskStatus | "all";
        setStatusFilter(newStatus);
    };

    // Handle priority filter change
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = e.target.value as "low" | "medium" | "high" | "all";
        setPriorityFilter(newPriority);
    };

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Handle sort option change
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value as SortOption | "";
        setSortOption(newSort);
    };

    // Update filters whenever any filter state changes
    React.useEffect(() => {
        onFilterChange({
            status: statusFilter === "all" ? undefined : statusFilter,
            priority: priorityFilter === "all" ? undefined : priorityFilter,
            search: searchTerm.trim() || undefined,
            sort: sortOption || undefined,
        });
    }, [statusFilter, priorityFilter, searchTerm, sortOption, onFilterChange]);

    return (
        <div>
            <div>
                {/* Search Input */}
                <div>
                    <label htmlFor="search-filter">Search Tasks</label>
                    <input
                        type="text"
                        id="search-filter"
                        placeholder="Search by title or description..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div>
                    {/* Status Filter */}
                    <div>
                        <label htmlFor="status-filter">Status</label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={handleStatusChange}
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Priority Filter */}
                    <div>
                        <label htmlFor="priority-filter">Priority</label>
                        <select
                            id="priority-filter"
                            value={priorityFilter}
                            onChange={handlePriorityChange}
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div>
                        <label htmlFor="sort-filter">Sort By</label>
                        <select
                            id="sort-filter"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="">No Sorting</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                            <option value="date-asc">Due Date (Earliest)</option>
                            <option value="date-desc">Due Date (Latest)</option>
                            <option value="priority-high">Priority (High to Low)</option>
                            <option value="priority-low">Priority (Low to High)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
