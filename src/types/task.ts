export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  subtasks?: string[];
}

export interface CreateTaskData {
  title: string;
  description: string;
  dueDate: string;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  status?: 'pending' | 'completed';
  subtasks?: string[];
}