import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { blue,grey } from '@mui/material/colors';
//import DeleteIcon from '@mui/icons-material/Delete';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: grey[200],
  color: 'black',
  '&:hover': {
    backgroundColor: grey[400],
  },
}));
const TaskButton = styled(Button)(({ theme }) => ({
  backgroundColor: blue[900],
  color: 'white',
  '&:hover': {
    backgroundColor: blue[400],
  },
}));

export default function Taskfield({setTasks, setShow}) {
  // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [timeAdded, setAddTime] = React.useState(new Date().toJSON());
  const [dueDate, setDueDate] = React.useState(new Date());
  //var [timeAdded, setAddTime] = React.useState(new Date().toJSON());
  const [name,setName] = React.useState('');
  //const [status, setStatus] = React.useState(false);
  const status = false;

  // const handleStatusChange=(e)=>{
  //   setStatus(e.target.checked);
  // }

  const addTaskHandler=(e)=>{
    // Don't let it refresh the page
    e.preventDefault()
    // set the added time and due date and send to back-end
    setAddTime(new Date().toJSON());
    const dueTime = dueDate.toJSON().slice(0,10)
    console.log(dueTime)
    // define the task message that needs to be sent
    const task={name,timeAdded,status,dueTime}
    console.log(task)
    //sent the message
    fetch("http://localhost:8080/task/add",{
    method:"Post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(task)})
    .then(()=>{
    console.log("New Task added")
    // finally clear the text input
    setName("");
    
    fetch("http://localhost:8080/task/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setTasks(result);})
  })}
  const hideTaskField = (e) => {
    setShow(false)
    //console.log(show)
  }

  return (
    <div className='taskField'>
      <div className='taskFieldInput'>
        <TextField
          fullWidth
          id="standard-textarea"
          label=""
          placeholder="add your next task, e.g., read a book"
          multiline
          variant="standard"
          InputProps={{ disableUnderline: true, style: { fontWeight: 'bold' }}}
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label=""
              value={dueDate}
              InputProps={{
                disableUnderline: true
              }}
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              renderInput={(params) => <TextField size="small" variant="standard" sx={{maxWidth: '130px', paddingTop: '25px'}}{...params} />}
            />
        </LocalizationProvider>
      </div>
  
      <div className="addTaskContainer">
        
        <TaskButton variant="contained" size="small" sx={{marginLeft: "auto", marginRight: "10px"}} onClick={addTaskHandler}>Add task</TaskButton>
        <ColorButton variant="contained" size="small" onClick={hideTaskField}>cancel</ColorButton>
      </div>
    </div>
  );
}
