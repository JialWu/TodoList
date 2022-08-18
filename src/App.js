import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Appbar from './components/Appbar';
import Taskfield from './components/Taskfield';
import Todolist from './components/TodoList';

function App() {
  const [tasks, setTasks] = React.useState([]);
  // const [todayTasks, setTodayTasks] = React.useState([]);
  // const dates = ["2018-09-12", "2018-10-18", "2018-12-30"];
  // const filteredDates = dates.filter(d => new Date(d) - new Date() > 0);

  const [show, setShow] = React.useState(false);
  const showTaskField = (e) => {
    setShow(true)
    console.log(show)
  }
  const hideTaskField = (e) => {
    setShow(false)
    console.log(show)
  }

  return (
    <>
    {/* Header     */}
    <div className="header">
      <h3 className="header-name">Todo List</h3>
    </div>

    <div><Appbar/></div>

    {/* <!-- The flexible grid (content) --> */}
    <div className="row">
      <div className="side">
        <div className="fakeimg">Today</div>
      </div>
      <div className="main">
        <h4>Today's tasks</h4>
        {/* <h5>Title description, Dec 7, 2017</h5> */}
        {/* <div className="fakeimg">Image</div> */}

        {/* today's task list */}
        <div>
          <Todolist tasks={tasks} setTasks={setTasks}/>
        </div>

        {/* show or hide taskfield */}
        {!show && <Button size="small" startIcon={<AddCircleOutlineIcon/>} onClick={showTaskField}>new task</Button>}
        { show && (<div><Taskfield setTasks={setTasks}/> <button onClick={hideTaskField}>cancel</button></div>)}

        {/* <Taskfield setTasks={setTasks}/> */}
        {/* <br> */}

        <h4>Overdued tasks</h4>
      </div>
    </div>


    {/* <div className="App">
    <Appbar />
    <br></br>
    <Taskfield setTasks={setTasks}/>
    <br></br>
    <Todolist tasks={tasks} setTasks={setTasks}/>
    </div> */}

    {/* <!-- Footer --> */}
    <div className="footer">
    </div>
    </>
  );
}

export default App;
