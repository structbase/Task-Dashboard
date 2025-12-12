import React, { useState, useMemo } from "react";
import type { TaskFormProps, TaskFormData } from "../types";

/**
 * Helper function to create a default empty task form state
 * Returns a TaskFormData object with empty/default values
 * Used when creating a new task (not editing)
 */
const getInitialTaskState = (): TaskFormData => ({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0], // Gets todays date in YYYY-MM-DD format
});

/**
 * TaskForm Component
 * Handles both creating new tasks and editing existing ones
 * Props:
 * - onSubmit: Callback function called when form is submited
 * - initialData: Optional task data for editing mode
 */
export const TaskForm: React.FC<TaskFormProps> = ({
    onSubmit,
    initialData,
}) => {
    // Memoize initial state to avoid recreating on every render
    // If initialData exists, we're in edit mode - use that data
    // Otherwise, use empty default state for new task creaton
    const initialState = useMemo(() => {
        if (initialData) {
            return {
                id: initialData.id, // Preserve task ID for updates
                title: initialData.title,
                description: initialData.description,
                status: initialData.status,
                priority: initialData.priority,
                dueDate: initialData.dueDate,
            };
        }
        return getInitialTaskState();
    }, [initialData]);

    // Main form state - holds current values of all form fields
    const [taskData, setTaskData] = useState<TaskFormData>(initialState);

    /**
     * Handles changes to any form input field
     * Uses the input's id attribute to dynamically update the correct field in state
     * This allows one handler to work for all form inputs (title, description, status, etc.)
     */
    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { id, value } = event.target; // Extract field name and new value
        setTaskData((prevData) => {
            return {
                ...prevData, // Keep existing values
                [id]: value, // Update only the changed field using computed property name
            } as TaskFormData; // Type assertion needed because TypeScript can't verify dynamic keys
        });
    };

    /**
     * Handles form submision
     * Validates that title is not empty, then calls onSubmit callback
     * Resets form to initial state after succesful submission
     */
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default browser form submission behavior

        if (taskData.title.trim()) {
            // Title is valid - submit the form data
            onSubmit(taskData);
            // Reset form back to initial state (empty for new task, or back to initialData for edit)
            setTaskData(initialState);
        } else {
            // Validation failed - show alert to user
            alert("Task Title is required!");
        }
    };

    // Determine if we're editing an existing task or creating a new one (edit vs create mode)
    const isEditMode = !!initialData;

    // Form JSX - all inputs are controlled components (value tied to state)
    return (
        <form onSubmit={handleSubmit}>
            {/* Task Title Input - Required field */}
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Task Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title" // Must match TaskFormData property name for handleChange to work
                    value={taskData.title} // Controlled component - value from state
                    onChange={handleChange} // Update state when user types
                    required // HTML5 validation - prevents empty submission
                />
            </div>

            {/* Task Description Textarea - Optional field for additional details */}
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description" // Must match TaskFormData property name
                    value={taskData.description}
                    onChange={handleChange}
                    rows={3}
                ></textarea>
            </div>

            {/* Status Dropdown - Task progress state */}
            <div className="mb-3">
                <label htmlFor="status" className="form-label">
                    Status
                </label>
                <select
                    className="form-select"
                    id="status" // Must match TaskFormData property name
                    value={taskData.status} // Current status value from state
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>{" "}
                    {/* All status values must be lowercase to match TaskStatus type */}
                </select>
            </div>

            {/* Priority Dropdown - Task importance level */}
            <div className="mb-3">
                <label htmlFor="priority" className="form-label">
                    Priority
                </label>
                <select
                    className="form-select"
                    id="priority" // Must match TaskFormData property name
                    value={taskData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Due Date Input - Date picker */}
            <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                    Due Date
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="dueDate" // Must match TaskFormData property name
                    value={taskData.dueDate}
                    onChange={handleChange}
                />
            </div>

            {/* Submit Button - Text changes based on edit/create mode (dynamic button label) */}
            <button type="submit" className="btn btn-primary w-100">
                {isEditMode ? "Update Task" : "Add Task"}
            </button>
        </form>
    );
};
