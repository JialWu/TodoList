import * as React from 'react';
import EditTask from './EditTask'
import PriorityConverter from './PriorityConverter';

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
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Todotasks({category, task, setTasks}) {

  const statusHandler = (e) => {
      const status = e.target.checked;
      const finished = {status}
      const delay = ms => new Promise(res => setTimeout(res, ms));

      fetch("http://127.0.0.1:8080/task/update/"+task.id,{
          method:"Put",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(finished)})
          .then(async ()=>{
              await delay(100); 
              
              fetch("http://127.0.0.1:8080/task/getAll")
              .then(res=>res.json())
              .then((result)=>{
              setTasks(result);})
          })
      }
  const [editShow, setEditShow] = React.useState(false);
  const showEditField = (e) => {
    setEditShow(true)
  }

  const deleteHandler = async(e) => {
      e.preventDefault();

      await fetch("http://127.0.0.1:8080/task/delete/"+task.id,
      {method: 'DELETE'},);

      await fetch("http://127.0.0.1:8080/task/getAll")
      .then(res=>res.json())
      .then((result)=>{
        setTasks(result);});
      }

  return (
    <>{!editShow &&
      <Item key={6} elevation={6}>
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
              <Grid container spacing={3}>
                <Grid item xs>
                  <ListItemIcon>
                    {!task.status && <Checkbox icon={<CheckCircleOutlineIcon fontSize="small"/>} checkedIcon={<CheckCircleIcon fontSize="small"/>}
                        onChange={statusHandler} />}
                    { task.status && <Checkbox icon={<CheckCircleOutlineIcon fontSize="small"/>} checkedIcon={<CheckCircleIcon fontSize="small"/>}
                        onChange={statusHandler} defaultChecked />}
                  </ListItemIcon>
                </Grid>
                <Grid item xs={4}>
                  <ListItemText primary={task.name} primaryTypographyProps={{ style: {fontSize: 'medium'}}} className={category}/>
                </Grid>
                <Grid item xs={3}>
                  <PriorityConverter value={task.priority} />
                </Grid>
                <Grid item xs>
                  {category !== 'finished' && <ListItemText primary={task.dueTime} primaryTypographyProps={{ style: {fontSize: 'small', float: 'right', marginRight:'25px'}}} className={category}/>}
                </Grid>
              </Grid>
            </ListItemButton>
        </ListItem>
      </Item>}
      { editShow && <EditTask task={task} setTasks={setTasks} setEditShow={setEditShow}/>}
    </>
  );
}