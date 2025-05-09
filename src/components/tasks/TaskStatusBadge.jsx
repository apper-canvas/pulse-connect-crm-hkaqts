import React from 'react';

const TaskStatusBadge = ({ status }) => {
  // Define style configurations for different statuses
  const statusConfig = {
    'pending': {
      bg: 'bg-yellow-100 dark:bg-yellow-900',
      text: 'text-yellow-800 dark:text-yellow-200',
      label: 'Pending'
    },
    'in-progress': {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-800 dark:text-blue-200',
      label: 'In Progress'
    },
    'completed': {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-200',
      label: 'Completed'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`${config.bg} ${config.text} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}>
      {config.label}
    </span>
  );
};

export default TaskStatusBadge;