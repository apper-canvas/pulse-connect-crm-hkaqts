import React from 'react';
import getIcon from '../../utils/iconUtils';

const TaskPriorityBadge = ({ priority }) => {
  const AlertCircle = getIcon('AlertCircle');
  
  // Define style configurations for different priorities
  const priorityConfig = {
    'high': {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-800 dark:text-red-300',
      label: 'High',
      icon: true
    },
    'medium': {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-800 dark:text-orange-300',
      label: 'Medium',
      icon: false
    },
    'low': {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      label: 'Low',
      icon: false
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <span className={`${config.bg} ${config.text} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}>
      {config.icon && <AlertCircle className="w-3 h-3 mr-1" />}
      {config.label}
    </span>
  );
};

export default TaskPriorityBadge;