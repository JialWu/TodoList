import React from 'react';
import ListItemText from '@mui/material/ListItemText';

export default function PriorityConverter(props) {
    const priorityMap = {
        1: 'Low Priority',
        2: 'Medium Priority',
        3: 'High Priority'
    };

    const classMap = {
        1: 'low-priority',
        2: 'medium-priority',
        3: 'high-priority'
    };

    var { value } = props;
    var priorityString = priorityMap[value];
    var priorityClass = classMap[value];

    return (
      <ListItemText primary={priorityString} primaryTypographyProps={{ style: {fontSize: 'medium'}}} className={priorityClass} />
    );
  }