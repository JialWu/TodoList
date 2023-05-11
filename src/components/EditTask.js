import * as React from 'react';
import PriorityField from './PriorityField';
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

export default function EditTask({task, setTasks, setEditShow}) {
  const [newDueDate, setNewDueDate] = React.useState(new Date());
  const [newName,setNewName] = React.useState(task.name);

  const [selectedPriority, setSelectedPriority] = React.useState('');

  const handleOptionChange = (option) => {
    setSelectedPriority(option);
  }

  const editTaskHandler=(e)=>{
    // Don't let it refresh the page
    e.preventDefault()
    // set the added time and due date and send to back-end
    const dueTime = newDueDate.toJSON().slice(0,10)
    const name = newName
    var priority = selectedPriority
    // define the task message that needs to be sent
    const editedTask={name,dueTime,priority}
    //sent the message
    fetch("http://127.0.0.1:8080/task/edit/"+task.id,{
        method:"Put",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(editedTask)})
        .then(()=>{
        console.log("Task edited")
        // finally clear the text input
        setNewName("");
        
        fetch("http://127.0.0.1:8080/task/getAll")
        .then(res=>res.json())
        .then((result)=>{
        setTasks(result);})
        })
    setEditShow(false)
  }
  const hideEditField = (e) => {
    setEditShow(false)
  }

  return (
    <div className='taskField'>
      <div className='taskFieldInput'>
        <TextField
          fullWidth
          id="standard-textarea"
          label=""
          placeholder=""
          multiline
          variant="standard"
          InputProps={{ disableUnderline: true, style: { fontWeight: 'bold' }}}
          value={newName}
          onChange={(e)=>setNewName(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label=""
              value={newDueDate}
              InputProps={{
                disableUnderline: true
              }}
              onChange={(newValue) => {
                setNewDueDate(newValue);
              }}
              renderInput={(params) => <TextField size="small" variant="standard" sx={{maxWidth: '130px', paddingTop: '25px'}}{...params} />}
            />
        <PriorityField onOptionChange={handleOptionChange} />
        </LocalizationProvider>
      </div>
  
      <div className="addTaskContainer">
        <TaskButton variant="contained" size="small" sx={{marginLeft: "auto", marginRight: "10px"}} onClick={editTaskHandler}>save</TaskButton>
        <ColorButton variant="contained" size="small" onClick={hideEditField}>cancel</ColorButton>
      </div>
    </div>
  );
}