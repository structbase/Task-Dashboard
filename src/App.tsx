import { useState, useEffect } from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import type { Task, TaskFormData, TaskStatus } from "./components/types";

// LocalStorage key for persisting tasks
const STORAGE_KEY = "task-dashboard-tasks";

/**
 * Loads tasks from localStorage
 * Returns empty array if no tasks are stored or if there's an error
 */
const loadTasksFromStorage = (): Task[] => {
    try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
            return JSON.parse(storedTasks) as Task[];
        }
    } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
    }
    return [];
};

/**
 * Saves tasks to localStorage
 * Handles errors gracefully
 */
const saveTasksToStorage = (tasks: Task[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
    }
};

/**
 * Main App Component
 * Manages the global task state and provides handlers to the Dashboard
 * Tasks are persisted to localStorage for data persistence across page refreshes
 */
function App() {
    // State to store all tasks - initialized from localStorage
    const [tasks, setTasks] = useState<Task[]>(() => {
        // Load tasks from localStorage on initial mount
        return loadTasksFromStorage();
    });

    // Save tasks to localStorage whenever tasks state changes
    useEffect(() => {
        saveTasksToStorage(tasks);
    }, [tasks]);

    /**
     * Handles adding a new task
     * Generates a unique ID and creates a new Task from TaskFormData
     */
    const handleAddTask = (formData: TaskFormData) => {
        const newTask: Task = {
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: formData.title,
            description: formData.description,
            status: formData.status,
            priority: formData.priority,
            dueDate: formData.dueDate,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    /**
     * Handles updating a task's status
     * Finds the task by ID and updates its status
     */
    const handleUpdateStatus = (id: string, newStatus: TaskStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
    };

    /**
     * Handles deleting a task
     * Removes the task with the given ID from the tasks array
     */
    const handleDeleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="App">
            <h1>Task Dashboard</h1>
            <Dashboard
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateStatus={handleUpdateStatus}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
}

export default App;
