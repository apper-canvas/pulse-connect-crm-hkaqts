import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import TaskForm from '../components/tasks/TaskForm';
import TaskStatusBadge from '../components/tasks/TaskStatusBadge';
import TaskPriorityBadge from '../components/tasks/TaskPriorityBadge';
import { format } from 'date-fns';

const Tasks = () => {
  // Icons
  const Plus = getIcon('Plus');
  const Search = getIcon('Search');
  const Filter = getIcon('Filter');
  const Edit = getIcon('Edit');
  const Trash = getIcon('Trash');
  const CheckCircle = getIcon('CheckCircle');
  const Circle = getIcon('Circle');
  const ArrowUp = getIcon('ArrowUp');
  const ArrowDown = getIcon('ArrowDown');
  const X = getIcon('X');

  // State
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'asc' });

  // Mock data - would normally come from an API
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: 'Call potential client',
        description: 'Schedule a call with ABC Corp to discuss new partnership',
        status: 'pending',
        priority: 'high',
        dueDate: '2023-06-15',
        assignedTo: 'John Doe',
        contactId: 101
      },
      {
        id: 2,
        title: 'Prepare quarterly report',
        description: 'Create Q2 sales report for management meeting',
        status: 'in-progress',
        priority: 'medium',
        dueDate: '2023-06-20',
        assignedTo: 'Sarah Johnson',
        contactId: 102
      },
      {
        id: 3,
        title: 'Update client database',
        description: 'Add new leads from the trade show to CRM',
        status: 'completed',
        priority: 'low',
        dueDate: '2023-06-10',
        assignedTo: 'Mark Wilson',
        contactId: 103
      },
      {
        id: 4,
        title: 'Send follow-up emails',
        description: 'Follow up with leads from last month\'s campaign',
        status: 'pending',
        priority: 'high',
        dueDate: '2023-06-18',
        assignedTo: 'Emily Brown',
        contactId: 104
      },
      {
        id: 5,
        title: 'Renew software subscriptions',
        description: 'Review and renew monthly SaaS subscriptions',
        status: 'in-progress',
        priority: 'medium',
        dueDate: '2023-06-25',
        assignedTo: 'John Doe',
        contactId: 101
      }
    ];
    
    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  // Filter and sort tasks
  useEffect(() => {
    let result = [...tasks];
    
    // Apply search query filter
    if (searchQuery) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredTasks(result);
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Create a new task
  const handleCreateTask = (taskData) => {
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      ...taskData
    };
    
    setTasks([...tasks, newTask]);
    toast.success('Task created successfully');
    setIsFormModalOpen(false);
  };

  // Update an existing task
  const handleUpdateTask = (taskData) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskData.id ? { ...task, ...taskData } : task
    );
    
    setTasks(updatedTasks);
    toast.success('Task updated successfully');
    setIsFormModalOpen(false);
  };

  // Delete a task
  const handleDeleteTask = () => {
    if (currentTask) {
      const updatedTasks = tasks.filter(task => task.id !== currentTask.id);
      setTasks(updatedTasks);
      toast.success('Task deleted successfully');
      setIsDeleteModalOpen(false);
      setCurrentTask(null);
    }
  };

  // Toggle task status
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    toast.success(`Task marked as ${tasks.find(t => t.id === id).status === 'completed' ? 'pending' : 'completed'}`);
  };

  // Open modal to edit a task
  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsFormModalOpen(true);
  };

  // Open modal to confirm delete
  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setIsDeleteModalOpen(true);
  };

  // Reset form and close modal
  const cancelForm = () => {
    setCurrentTask(null);
    setIsFormModalOpen(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto py-6"
    >
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">Tasks</h1>
          <button 
            className="btn btn-primary flex items-center"
            onClick={() => {
              setCurrentTask(null);
              setIsFormModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-300 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-300 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white dark:bg-surface-800"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-300 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white dark:bg-surface-800"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto rounded-xl shadow-card">
          <table className="w-full bg-white dark:bg-surface-800 rounded-xl overflow-hidden">
            <thead className="bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => toggleTaskStatus()}>
                    Status
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('title')}>
                    Title
                    {sortConfig.key === 'title' && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 w-3 h-3" /> : <ArrowDown className="ml-1 w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('priority')}>
                    Priority
                    {sortConfig.key === 'priority' && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 w-3 h-3" /> : <ArrowDown className="ml-1 w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('dueDate')}>
                    Due Date
                    {sortConfig.key === 'dueDate' && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 w-3 h-3" /> : <ArrowDown className="ml-1 w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('assignedTo')}>
                    Assigned To
                    {sortConfig.key === 'assignedTo' && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 w-3 h-3" /> : <ArrowDown className="ml-1 w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className="text-primary dark:text-primary-light hover:text-primary-dark transition-colors"
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`font-medium ${task.status === 'completed' ? 'line-through text-surface-500 dark:text-surface-400' : 'text-surface-800 dark:text-surface-200'}`}>
                          {task.title}
                        </span>
                        <span className="text-xs text-surface-500 dark:text-surface-400 mt-1 max-w-xs truncate">
                          {task.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TaskPriorityBadge priority={task.priority} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-surface-600 dark:text-surface-300">
                        {formatDate(task.dueDate)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-surface-600 dark:text-surface-300">
                        {task.assignedTo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(task)}
                          className="p-1.5 text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(task)}
                          className="p-1.5 text-surface-600 hover:text-accent dark:text-surface-400 dark:hover:text-accent rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-surface-500 dark:text-surface-400">
                    No tasks found. Try adjusting your filters or create a new task.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Task Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-xl font-bold text-surface-800 dark:text-surface-100">
                {currentTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <button
                onClick={cancelForm}
                className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <TaskForm
              task={currentTask}
              onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
              onCancel={cancelForm}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-surface-800 dark:text-surface-100 mb-4">Confirm Delete</h3>
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                Are you sure you want to delete the task "{currentTask.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTask}
                  className="btn bg-accent hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;