'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Edit2, 
  Trash2, 
  Brain, 
  ChevronDown, 
  ChevronUp,
  Loader2 
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
// import { cn } from '@/app/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onUpdateSubtasks: (id: string, subtasks: string[]) => void;
}

export function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onUpdateSubtasks 
}: TaskCardProps) {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [loadingSubtasks, setLoadingSubtasks] = useState(false);

  const isOverdue = new Date(task.dueDate) < new Date() && task.status === 'pending';

  const handleSuggestSubtasks = async () => {
    if (task.subtasks && task.subtasks.length > 0) {
      setShowSubtasks(!showSubtasks);
      return;
    }

    setLoadingSubtasks(true);
    try {
      const response = await fetch('/api/tasks/suggest-subtasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskTitle: task.title,
          taskDescription: task.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate subtasks');
      }

      const data = await response.json();
      onUpdateSubtasks(task.id, data.subtasks);
      setShowSubtasks(true);
    } catch (error) {
      console.error('Error generating subtasks:', error);
    } finally {
      setLoadingSubtasks(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "group relative overflow-hidden border border-[#333333] bg-gradient-to-b from-[#242424] to-[#121212] shadow-[0_1px_0_1px_rgba(0,0,0,0.02),_0_4px_6px_rgba(0,0,0,0.02),_inset_0_0_0_6px_#111111] backdrop-blur-sm hover:shadow-xl transition-all duration-300",
        task.status === 'completed' && "opacity-75",
        isOverdue && "border-l-4 border-[#4e0e0e]"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={task.status === 'completed'}
                onCheckedChange={() => onToggleStatus(task.id)}
                className="mt-1 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <CardTitle className={cn(
                  "text-lg font-semibold  transition-all duration-200",
                  task.status === 'completed' && "line-through "
                )}>
                  {task.title}
                </CardTitle>
                {task.description && (
                  <p className={cn(
                    "text-sm  mt-1 line-clamp-2",
                    task.status === 'completed' && ""
                  )}>
                    {task.description}
                  </p>
                )}
              </div>
            </div>
            <Badge variant={task.status === 'completed' ? 'secondary' : 'default'}>
              {task.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="py-2">
          <div className="flex items-center gap-2 text-sm ">
            <Calendar className="h-4 w-4" />
            <span className={cn(isOverdue && "text-red-500 font-medium")}>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
            {isOverdue && (
              <Badge variant="destructive" className="ml-2">
                Overdue
              </Badge>
            )}
          </div>

          <AnimatePresence>
            {showSubtasks && task.subtasks && task.subtasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-2"
              >
                <h4 className="font-medium ">Suggested Subtasks:</h4>
                <div className="space-y-2">
                  {task.subtasks.map((subtask, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 p-2 rounded-md text-sm"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>{subtask}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="pt-3 border-[#5a5a5a] border-t bg-black">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSuggestSubtasks}
              disabled={loadingSubtasks}
              className="flex items-center gap-2 bg-[#c8f31d] text-black cursor-pointer"
            >
              {loadingSubtasks ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              {task.subtasks && task.subtasks.length > 0 ? (
                <>
                  {showSubtasks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  Subtasks
                </>
              ) : (
                'Suggest Subtasks'
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}