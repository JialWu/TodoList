import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';

export default function Todotasks({text, task, setTasks}) {
    // const [status, setstatus] = React.useState(false);
    const statusHandler = (e) => {
        const status = e.target.checked;
        const finished={status}
        const delay = ms => new Promise(res => setTimeout(res, ms));
        console.log(finished);

        fetch("http://localhost:8080/task/update/"+task.id,{
            method:"Put",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(finished)})
            .then(async ()=>{
                console.log(task.id+"task finished")
                await delay(100); 
                
                fetch("http://localhost:8080/task/getAll")
                .then(res=>res.json())
                .then((result)=>{
                setTasks(result);})
            })
        }

    const deleteHandler = async(e) => {
        e.preventDefault();

        await fetch("http://localhost:8080/task/delete/"+task.id,
        {method: 'DELETE'},);

        await fetch("http://localhost:8080/task/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setTasks(result);});
        }

    return (
      <>
        <ListItem
            secondaryAction={
              <IconButton edge="end" onClick={deleteHandler}>
                <DeleteForeverIcon />
              </IconButton>
            }
            disablePadding
        >
            {/* TODO: onClick for each task linking to its detail page: onClick={handleToggle()} */}
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox icon={<CheckCircleOutlineIcon />} checkedIcon={<CheckCircleIcon />}// status={status}
                  onChange={statusHandler} />
              </ListItemIcon>
              <ListItemText primary={text} primaryTypographyProps={{ style: {fontSize: 'large'}}}/>
            </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
}