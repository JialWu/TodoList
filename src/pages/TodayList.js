import * as React from 'react';
import Todolist from '../components/TodoList';

const TodayList = () => {
  const [tasks, setTasks] = React.useState([]);
  return (
    <><Todolist tasks={tasks} setTasks={setTasks}/></>
  )
};

export default TodayList;