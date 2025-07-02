import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';

const STORAGE_KEY = 'smart-task-manager-tasks';

export function getTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}

export function createTask(data: CreateTaskData): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    status: 'pending',
    dueDate: data.dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subtasks: [],
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  
  return task;
}

export function updateTask(id: string, data: UpdateTaskData): Task | null {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) return null;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  saveTasks(tasks);
  return tasks[taskIndex];
}

export function deleteTask(id: string): boolean {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== id);
  
  if (filteredTasks.length === tasks.length) return false;
  
  saveTasks(filteredTasks);
  return true;
}