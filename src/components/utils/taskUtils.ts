import type { Task, TaskFilterOptions, SortOption } from "../types";

/**
 * Filters tasks based on filter options
 * @param tasks - Array of tasks to filter
 * @param filters - Filter options (status, priority, search)
 * @returns Filtered array of tasks
 */
export const filterTasks = (
    tasks: Task[],
    filters: TaskFilterOptions
): Task[] => {
    return tasks.filter((task) => {
        // Filter by status if provided
        if (filters.status && task.status !== filters.status) {
            return false;
        }

        // Filter by priority if provided
        if (filters.priority && task.priority !== filters.priority) {
            return false;
        }

        // Filter by search term if provided (searches in title and description)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesTitle = task.title.toLowerCase().includes(searchLower);
            const matchesDescription = task.description
                .toLowerCase()
                .includes(searchLower);
            if (!matchesTitle && !matchesDescription) {
                return false;
            }
        }

        return true;
    });
};

/**
 * Sorts tasks based on sort option
 * @param tasks - Array of tasks to sort
 * @param sortOption - Sort option (title-asc, title-desc, date-asc, date-desc, priority-high, priority-low)
 * @returns Sorted array of tasks
 */
export const sortTasks = (tasks: Task[], sortOption: SortOption): Task[] => {
    const sortedTasks = [...tasks]; // Create a copy to avoid mutating original array

    switch (sortOption) {
        case "title-asc":
            return sortedTasks.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        case "title-desc":
            return sortedTasks.sort((a, b) =>
                b.title.localeCompare(a.title)
            );
        case "date-asc":
            return sortedTasks.sort(
                (a, b) =>
                    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
        case "date-desc":
            return sortedTasks.sort(
                (a, b) =>
                    new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
            );
        case "priority-high":
            // Priority order: high > medium > low
            { const priorityOrder = { high: 3, medium: 2, low: 1 };
            return sortedTasks.sort(
                (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
            ); }
        case "priority-low":
            // Priority order: low > medium > high
            { const priorityOrderLow = { low: 1, medium: 2, high: 3 };
            return sortedTasks.sort(
                (a, b) =>
                    priorityOrderLow[a.priority] - priorityOrderLow[b.priority]
            ); }
        default:
            return sortedTasks;
    }
};

/**
 * Applies both filtering and sorting to tasks
 * @param tasks - Array of tasks to process
 * @param filters - Filter options
 * @returns Filtered and sorted array of tasks
 */
export const getFilteredAndSortedTasks = (
    tasks: Task[],
    filters: TaskFilterOptions
): Task[] => {
    let result = filterTasks(tasks, filters);
    if (filters.sort) {
        result = sortTasks(result, filters.sort);
    }
    return result;
};

