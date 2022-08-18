import * as React from 'react';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

export default function Taskfield({setTasks}) {
  // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [timeAdded, setAddTime] = React.useState(new Date().toJSON());
  const [dueDate, setDueDate] = React.useState(new Date());
  //var [timeAdded, setAddTime] = React.useState(new Date().toJSON());
  const [name,setName] = React.useState('');
  const [status, setStatus] = React.useState(false);

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

  return (
      <div className='taskField'>
          <CssTextField
            fullWidth
            id="outlined-multiline-static"
            label=""
            multiline
            rows={4}
            placeholder='add your next task, e.g., read a book'
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <div className="addTaskContainer">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label=""
                value={dueDate}
                onChange={(newValue) => {
                  setDueDate(newValue);
                }}
                renderInput={(params) => <TextField size="small" fontSize="small" sx={{maxWidth: '50%'}}{...params} />}
              />
            </LocalizationProvider>

          <div>
            <input type="checkbox" checked={status}
                   onChange={() => setStatus(!status)}
                   // onClick={handleStatusChange}
            />
          </div> 

          <div>
            <button className="addTask-btn" onClick={addTaskHandler}>
              <span>Add task</span>
            </button>
          </div>
        </div>

        {/* <TextField
          id="outlined-multiline-static"
          label="Task"
          multiline
          rows={3}
          //defaultValue=""
          value={name}
          onChange={(e)=>setName(e.target.value)}
        /> */}
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due time"
            value={timeAdded}
            onChange={(newValue) => {
              setAddTime(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}

        {/* <Checkbox
          {...label}
          //defaultChecked
          checked={status}
          onClick={handleStatusChange}
          sx={{
            color: pink[800],
            '&.Mui-checked': {
            color: pink[600],
          },
        }}
        /> */}
        {/* <Button variant="contained" color="success" onClick={handleClick}>
            Add
        </Button> */}
      </div>
  );
}
