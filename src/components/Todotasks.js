import * as React from 'react';
import EditTask from './EditTask'

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';

export default function Todotasks({category, task, setTasks}) {

  const statusHandler = (e) => {
      const status = e.target.checked;
      const finished = {status}
      const delay = ms => new Promise(res => setTimeout(res, ms));
      console.log(finished);

      fetch("http://192.168.178.31:8080/task/update/"+task.id,{
          method:"Put",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(finished)})
          .then(async ()=>{
              console.log(task.id+"task finished")
              await delay(100); 
              
              fetch("http://192.168.178.31:8080/task/getAll")
              .then(res=>res.json())
              .then((result)=>{
              setTasks(result);})
          })
      }
  const [editShow, setEditShow] = React.useState(false);
  const showEditField = (e) => {
    setEditShow(true)
    console.log(editShow)
  }

  const deleteHandler = async(e) => {
      e.preventDefault();

      await fetch("http://192.168.178.31:8080/task/delete/"+task.id,
      {method: 'DELETE'},);

      await fetch("http://192.168.178.31:8080/task/getAll")
      .then(res=>res.json())
      .then((result)=>{
        setTasks(result);});
      }

  return (
    <>{!editShow &&
      <>
      <ListItem
          secondaryAction={
            <>
              <IconButton edge="end" onClick={showEditField}>
                <EditIcon fontSize="small"/>
              </IconButton>
              <IconButton edge="end" onClick={deleteHandler}>
                <DeleteForeverIcon fontSize="small"/>
              </IconButton>
            </>
          }
          disablePadding >
          {/* TODO: onClick for each task linking to its detail page: onClick={handleToggle()} */}
          <ListItemButton role={undefined} dense>
            <ListItemIcon>
            {!task.status && <Checkbox icon={<CheckCircleOutlineIcon fontSize="small"/>} checkedIcon={<CheckCircleIcon fontSize="small"/>}// status={status}
                onChange={statusHandler} />}
            { task.status && <Checkbox icon={<CheckCircleOutlineIcon fontSize="small"/>} checkedIcon={<CheckCircleIcon fontSize="small"/>}// status={status}
                onChange={statusHandler} defaultChecked />}
            </ListItemIcon>
            <ListItemText primary={task.name} primaryTypographyProps={{ style: {fontSize: 'medium'}}} className={category}/>
            {/* {category === "overdued" && (<ErrorOutlineIcon fontSize="small" className={category + ' alert'}/>)} */}
            {category !== 'finished' && <ListItemText primary={task.dueTime} primaryTypographyProps={{ style: {fontSize: 'small', float: 'right', marginRight:'25px'}}} className={category}/>}
          </ListItemButton>
      </ListItem>
      <Divider /></>}
      { editShow && <EditTask task={task} setTasks={setTasks} setEditShow={setEditShow}/>}
    </>
  );
}