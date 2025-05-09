import { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    assignedTo: ''
  });

  const [errors, setErrors] = useState({});

  // Initialize form with task data if editing
  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        assignedTo: task.assignedTo || '',
        contactId: task.contactId || null
      });
    }
  }, [task]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assignment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="input-group md:col-span-2">
          <label htmlFor="title" className="label">
            Task Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full ${errors.title ? 'border-accent' : ''}`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-accent text-sm">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="input-group md:col-span-2">
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full"
            placeholder="Enter task description"
          ></textarea>
        </div>

        {/* Status */}
        <div className="input-group">
          <label htmlFor="status" className="label">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div className="input-group">
          <label htmlFor="priority" className="label">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="input-group">
          <label htmlFor="dueDate" className="label">
            Due Date*
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full ${errors.dueDate ? 'border-accent' : ''}`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-accent text-sm">{errors.dueDate}</p>
          )}
        </div>

        {/* Assigned To */}
        <div className="input-group">
          <label htmlFor="assignedTo" className="label">
            Assigned To*
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className={`w-full ${errors.assignedTo ? 'border-accent' : ''}`}
            placeholder="Enter assignee name"
          />
          {errors.assignedTo && (
            <p className="mt-1 text-accent text-sm">{errors.assignedTo}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button 
          type="button" 
          onClick={onCancel}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="btn btn-primary"
        >
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;