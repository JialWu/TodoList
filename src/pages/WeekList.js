import * as React from 'react';
import Todotasks from '../components/Todotasks';
import Taskfield from '../components/Taskfield';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//import Todolist from '../components/TodoList';

Date.prototype.GetFirstDayOfWeek = function() {
    return (new Date(this.setDate(this.getDate() - this.getDay()+ (this.getDay() === 0 ? -6:1) )));
}
Date.prototype.GetLastDayOfWeek = function() {
    return (new Date(this.setDate(this.getDate() - this.getDay() +7)));
}

const WeekList = () => {
    const [tasks, setTasks] = React.useState([]);
    var today = new Date();
    var curDate = today.toJSON().slice(0,10)
    var FirstDay = today.GetFirstDayOfWeek().toJSON().slice(0,10)
    var LastDay = today.GetLastDayOfWeek().toJSON().slice(0,10)
    //var monday = new Date()
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
      {tasks.filter(task=>task.dueTime && (task.dueTime >= FirstDay) && (task.dueTime <= LastDay) && (task.dueTime >= curDate) && (task.status === false))
            .map(task=>(<Todotasks key={task.id} category="pending" task={task} setTasks={setTasks}/>))}
      {tasks.filter(task=>task.dueTime && (task.dueTime >= FirstDay) && (task.dueTime <= LastDay) && (task.dueTime < curDate) && (task.status === false))
            .map(task=>(<Todotasks key={task.id} category="overdued" task={task} setTasks={setTasks}/>))}
      
      <h4>Finished tasks</h4>
      <Divider />      
      {tasks.filter(task=>task.dueTime && (FirstDay <= task.dueTime) && (task.dueTime <= LastDay) && (task.status === true))
            .map(task=>(<Todotasks key={task.id} category="finished" task={task} setTasks={setTasks}/>))}
      
    </List>
  )
};

export default WeekList;