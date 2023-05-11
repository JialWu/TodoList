import * as React from 'react';
import moment from 'moment';
import Todotasks from '../components/Todotasks';
import Taskfield from '../components/Taskfield';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//import Todolist from '../components/TodoList';

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 2);
  }

function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 1);
}

const MonthList = () => {
    const [tasks, setTasks] = React.useState([]);
    var date = new Date();
    var firstDayCurrentMonth = getFirstDayOfMonth(
      date.getFullYear(),
      date.getMonth(),
    );

    var lastDayCurrentMonth = getLastDayOfMonth(
      date.getFullYear(),
      date.getMonth(),
    );
    var today = moment().format('YYYY-MM-DD');
    var curDate = today;
    var FirstDay = firstDayCurrentMonth.toJSON().slice(0,10)
    var LastDay = lastDayCurrentMonth.toJSON().slice(0,10)
    //var monday = new Date()
    React.useEffect(()=>{
        fetch("http://127.0.0.1:8080/task/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setTasks(result);
        }
        )
      },[setTasks])
    const [show, setShow] = React.useState(false);
    const showTaskField = (e) => {
      setShow(true)
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
      {tasks.filter(task=>task.dueTime && (FirstDay < task.dueTime) && (task.dueTime < LastDay) && (task.status === true))
            .map(task=>(<Todotasks key={task.id} category="finished" task={task} setTasks={setTasks}/>))}
      
    </List>
  )
};

export default MonthList;