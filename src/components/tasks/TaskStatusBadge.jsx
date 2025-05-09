import React from 'react';

const TaskStatusBadge = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  let statusText = '';

  switch (status) {
    case 'completed':
      bgColor = 'bg-green-100 dark:bg-green-900';
      textColor = 'text-green-800 dark:text-green-200';
      statusText = 'Completed';
      break;
    case 'in-progress':
      bgColor = 'bg-blue-100 dark:bg-blue-900';
      textColor = 'text-blue-800 dark:text-blue-200';
      statusText = 'In Progress';
      break;
    default: // pending
      bgColor = 'bg-yellow-100 dark:bg-yellow-900';
      textColor = 'text-yellow-800 dark:text-yellow-200';
      statusText = 'Pending';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>{statusText}</span>
  );
};

export default TaskStatusBadge;