// Status options
export type TaskStatus = "pending" | "in-progress" | "completed";

// Priority options
export type TaskPriority = "low" | "medium" | "high";

// Sorting options
export type SortOption =
    | "title-asc"
    | "title-desc"
    | "date-asc"
    | "date-desc"
    | "priority-high"
    | "priority-low";

// Single task
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

// Form data (add/edit)
export interface TaskFormData {
    id?: string; // optional for editing
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

// Filter options
export interface TaskFilterOptions {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
    sort?: SortOption; // important for SBA
}

// TaskList Props
export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (id: string, newStatus: TaskStatus) => void;
    onDelete: (id: string) => void;
}

// TaskItem Props
export interface TaskItemProps {
    task: Task;
    onStatusChange: (id: string, newStatus: TaskStatus) => void;
    onDelete: (id: string) => void;
}

// TaskForm Props
export interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void;
    initialData?: Task; // for editing
}

// TaskFilter Props
export interface TaskFilterProps {
    onFilterChange: (filters: TaskFilterOptions) => void;
}

// Dashboard Props
export interface DashboardProps {
    tasks: Task[];
    onAddTask: (task: TaskFormData) => void;
    onUpdateStatus: (id: string, newStatus: TaskStatus) => void;
    onDeleteTask: (id: string) => void;
}
