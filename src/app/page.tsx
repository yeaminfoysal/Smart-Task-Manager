'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { TaskStats } from '@/components/TaskStats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Brain, Sparkles } from 'lucide-react';
import { createTask, updateTask, deleteTask, getTasks } from '@/lib/storage';
import { Footer } from 'react-day-picker';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
    setFilteredTasks(loadedTasks);
  }, []);

  useEffect(() => {
    let filtered = tasks;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, statusFilter]);

  const handleCreateTask = (data: CreateTaskData) => {
    const newTask = createTask(data);
    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleUpdateTask = (data: CreateTaskData) => {
    if (!editingTask) return;

    const updatedTask = updateTask(editingTask.id, data);
    if (updatedTask) {
      setTasks(prev => prev.map(task =>
        task.id === editingTask.id ? updatedTask : task
      ));
    }
    setEditingTask(undefined);
  };

  const handleDeleteTask = (id: string) => {
    const success = deleteTask(id);
    if (success) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const updatedTask = updateTask(id, { status: newStatus });

    if (updatedTask) {
      setTasks(prev => prev.map(t =>
        t.id === id ? updatedTask : t
      ));
    }
  };

  const handleUpdateSubtasks = (id: string, subtasks: string[]) => {
    const updatedTask = updateTask(id, { subtasks });
    if (updatedTask) {
      setTasks(prev => prev.map(task =>
        task.id === id ? updatedTask : task
      ));
    }
  };

  return (
    <>
      <div className="min-h-screen ">
        {/* Background Pattern */}
        <div className={`absolute inset-0 pointer-events-none`} />


        <div className="relative z-10 max-w-6xl mx-auto px-4 py-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-[#c8f31d] rounded-2xl shadow-lg">
                <Brain className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-4xl font-bold bg-[#c8f31d] bg-clip-text text-transparent">
                Smart Task Manager
              </h1>
            </div>
            <p className="text-gray-200 text-lg">
              Organize your tasks with AI-powered suggestions
            </p>
          </motion.div>

          {/* Stats */}
          <TaskStats tasks={tasks} />

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 " />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1a1a1a] backdrop-blur-sm border-0 shadow-sm !focus:outline-none !focus:ring-0 !focus:border-0"
              />
            </div>

            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-full sm:w-48 bg-[#1a1a1a] backdrop-blur-sm border-0 shadow-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className='bg-[#1a1a1a]'>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#c8f31d] hover:to-purple-700 text-black shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </motion.div>

          {/* Tasks Grid */}
          <AnimatePresence mode="popLayout">
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-[#1a1a1a] rounded-full">
                    <Sparkles className="h-8 w-8 text-[#c8f31d]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your search'}
                    </h3>
                    <p className="text-gray-400">
                      {tasks.length === 0
                        ? 'Create your first task to get started with AI-powered organization'
                        : 'Try adjusting your search or filter criteria'
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    onToggleStatus={handleToggleStatus}
                    onUpdateSubtasks={handleUpdateSubtasks}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Task Form Modal */}
          <AnimatePresence>
            {(showForm || editingTask) && (
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTask(undefined);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}