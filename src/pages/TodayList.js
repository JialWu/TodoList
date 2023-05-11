import * as React from 'react';
import Todolist from '../components/TodoList';
import DateTime from '../components/DateTime';
import { Divider } from '@mui/material';

const TodayList = () => {
  const [tasks, setTasks] = React.useState([]);
  return (
    <>
      <DateTime></DateTime>
      <Divider />
      <Todolist tasks={tasks} setTasks={setTasks}/>
    </>
  )
};

export default TodayList;