import React from 'react';

const TaskPriorityBadge = ({ priority }) => {
  let bgColor = '';
  let textColor = '';
  let priorityText = '';

  switch (priority) {
    case 'high':
      bgColor = 'bg-red-100 dark:bg-red-900';
      textColor = 'text-red-800 dark:text-red-200';
      priorityText = 'High';
      break;
    case 'medium':
      bgColor = 'bg-orange-100 dark:bg-orange-900';
      textColor = 'text-orange-800 dark:text-orange-200';
      priorityText = 'Medium';
      break;
    default: // low
      bgColor = 'bg-green-100 dark:bg-green-900';
      textColor = 'text-green-800 dark:text-green-200';
      priorityText = 'Low';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>{priorityText}</span>
  );
};

export default TaskPriorityBadge;