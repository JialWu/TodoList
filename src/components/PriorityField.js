import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function PriorityField(props) {
  const [priority, setPriority] = React.useState('');

  const handleChange = (event) => {
    setPriority(event.target.value);
    props.onOptionChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="priority-select">Priority</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="priority-select"
            value={priority}
            label="Priority"
            onChange={handleChange}
            >
            <MenuItem value={0}>
            <em>None</em>
            </MenuItem>
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={1}>Low</MenuItem>
        </Select>
    </FormControl>
  );
}