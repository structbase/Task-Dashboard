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
        <div className="container-fluid">
            <div className="row g-4">
                {/* Task Form Section - For creating new tasks */}
                <div className="col-12 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="h5 mb-0">Add New Task</h2>
                        </div>
                        <div className="card-body">
                            <TaskForm onSubmit={handleAddTask} />
                        </div>
                    </div>
                </div>

                {/* Filter and Task List Section */}
                <div className="col-12 col-lg-8">
                    {/* Filter Section - For filtering and sorting tasks */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-secondary text-white">
                            <h2 className="h5 mb-0">Filter & Sort Tasks</h2>
                        </div>
                        <div className="card-body">
                            <TaskFilter onFilterChange={handleFilterChange} />
                        </div>
                    </div>

                    {/* Task List Section - Displays filtered and sorted tasks */}
                    <div className="card shadow-sm">
                        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                            <h2 className="h5 mb-0">Tasks</h2>
                            <span className="badge bg-light text-dark fs-6">
                                {filteredTasks.length}
                            </span>
                        </div>
                        <div className="card-body">
                            <TaskList
                                tasks={filteredTasks}
                                onStatusChange={handleStatusChange}
                                onDelete={handleDeleteTask}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 