import React, { useState, useMemo } from "react";
import type { DashboardProps, TaskFilterOptions } from "../types";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskList } from "../TaskList/TaskList";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { getFilteredAndSortedTasks } from "../utils/taskUtils";

/**
 * Dashboard Component
 * Main container component that manages task state, filtering, and rendering
 * Combines TaskForm, TaskFilter, and TaskList components
 * 
 * Props:
 * - tasks: Array of all tasks
 * - onAddTask: Callback to add a new task
 * - onUpdateStatus: Callback to update task status
 * - onDeleteTask: Callback to delete a task
 */
export const Dashboard: React.FC<DashboardProps> = ({
    tasks,
    onAddTask,
    onUpdateStatus,
    onDeleteTask,
}) => {
    // Filter state - manages current filter options (status, priority, search, sort)
    const [filters, setFilters] = useState<TaskFilterOptions>({});

    // Memoize filtered and sorted tasks to avoid recalculating on every render
    // Only recalculates when tasks or filters change
    const filteredTasks = useMemo(() => {
        return getFilteredAndSortedTasks(tasks, filters);
    }, [tasks, filters]);

    /**
     * Handles filter changes from TaskFilter component
     * Updates the filters state which triggers task filtering
     */
    const handleFilterChange = (newFilters: TaskFilterOptions) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters, // Merge new filters with existing ones
        }));
    };

    /**
     * Handles form submission from TaskForm
     * Passes form data directly to parent component's onAddTask handler
     * Parent component is responsible for generating ID and creating the Task
     */
    const handleAddTask = (formData: Parameters<typeof onAddTask>[0]) => {
        onAddTask(formData);
    };

    /**
     * Handles status change from TaskList/TaskItem
     * Passes through to parent component's onUpdateStatus handler
     */
    const handleStatusChange = (id: string, newStatus: Parameters<typeof onUpdateStatus>[1]) => {
        onUpdateStatus(id, newStatus);
    };

    /**
     * Handles task deletion from TaskList/TaskItem
     * Passes through to parent component's onDeleteTask handler
     */
    const handleDeleteTask = (id: string) => {
        onDeleteTask(id);
    };

    return (
        <div>
            {/* Task Form Section - For creating new tasks */}
            <div>
                <h2>Add New Task</h2>
                <TaskForm onSubmit={handleAddTask} />
            </div>

            {/* Filter Section - For filtering and sorting tasks */}
            <div>
                <h2>Filter Tasks</h2>
                <TaskFilter onFilterChange={handleFilterChange} />
            </div>

            {/* Task List Section - Displays filtered and sorted tasks */}
            <div>
                <h2>Tasks ({filteredTasks.length})</h2>
                <TaskList
                    tasks={filteredTasks}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                />
            </div>
        </div>
    );
}; 