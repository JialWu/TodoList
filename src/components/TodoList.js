import * as React from 'react';
import List from '@mui/material/List';
import Todotasks from './Todotasks';
//import { Paper } from '@mui/material';

export default function Todolist({tasks, setTasks}) {
    //const [tasks, setTasks] = React.useState([]);
    var curTime = new Date().toJSON().slice(0,10);
    React.useEffect(()=>{
        fetch("http://localhost:8080/task/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setTasks(result);
        }
        )
      },[setTasks])

  return (
    <List sx={{ width: '100%', maxWidth: '50%', bgcolor: 'background.paper' }}>
      {tasks.filter(task=>task.dueTime && (task.dueTime === curTime) && (task.status === false))
            .map(todayTask=>(<Todotasks key={todayTask.id} text={todayTask.name} task={todayTask} setTasks={setTasks}/>))}
    </List>
  );
}
