import * as React from 'react';
import moment from 'moment';
import Todotasks from './Todotasks';
import Taskfield from './Taskfield';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//import { Paper } from '@mui/material';

export default function Todolist({tasks, setTasks}) {
    //const [tasks, setTasks] = React.useState([]);
    var curDate = moment().format('YYYY-MM-DD');
    React.useEffect(()=>{
        fetch("http://192.168.178.31:8080/task/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setTasks(result);
        }
        )
      },[setTasks])
    const [show, setShow] = React.useState(false);
    const showTaskField = (e) => {
      setShow(true)
      console.log(show)
    }

  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {/* show or hide taskfield */}
      {!show && <Button startIcon={<AddCircleOutlineIcon fontSize="small"/>} onClick={showTaskField}>add task</Button>}
      { show && <Taskfield setTasks={setTasks} setShow={setShow}/>}

      <h4>Unfinished tasks</h4>
      <Divider />
      {tasks.filter(task=>task.dueTime && (task.dueTime === curDate) && (task.status === false))
            .map(task=>(<Todotasks key={task.id} category="pending" task={task} setTasks={setTasks}/>))}   
      {tasks.filter(task=>task.dueTime && (task.dueTime < curDate) && (task.status === false))
            .map(task=>(<Todotasks key={task.id} category="overdued" task={task} setTasks={setTasks}/>))}
      
      <h4>Finished tasks</h4>
      <Divider />      
      {tasks.filter(task=>task.dueTime && (task.dueTime === curDate) && (task.status === true))
            .map(task=>(<Todotasks key={task.id} category="finished" task={task} setTasks={setTasks}/>))}
    </List>
  );
}
