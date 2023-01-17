import * as React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import TodayList from "./pages/TodayList";
import WeekList from './pages/WeekList';
import MonthList from './pages/MonthList';
import SelectedList from './pages/SelectedList';
import SetTimer from './pages/SetTimer';
import Time from './components/Time'; 

import './App.css';

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      {/*  Header */}
      <div className="header">
        <img src="./todologo.png" alt=""  className="logo"/>
        <h3 className="header-name">TodoToday</h3>
        <button style={{marginLeft: "75%",background:"none", border:"none", color:"white", fontSize:"large", cursor:"pointer"}}></button>
      </div>
      {/*  Timer  */}
      <div className="timer">
      <Paper sx={{ mx: 'auto', width: '500px', p:3, bgcolor: 'white' }} elevation={3}>
        <Time />
      </Paper>
      </div>
      {/* <!-- The flexible grid (content) --> */}
      <div className="row">
        <div className="side">
        <Box>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            
          >
            <Tab label="Today" to='/' component={Link} />
            <Tab label="This Week" to='/WeekList' component={Link} />
            <Tab label="This Month" to='/MonthList' component={Link} />
            <Tab label="Select Date" to='/SetTimer' component={Link} />
          </Tabs>
        </Box>
        </div>
        <Outlet />
      
        <div className="main">
          {/* today's task list */}
          <div>
            <Routes>
                <Route path="/" element={<TodayList />}></Route>
                <Route path="/WeekList" element={<WeekList />}></Route>
                <Route path="/MonthList" element={<MonthList />}></Route>
                <Route path="/SelectedList" element={<SelectedList />}></Route>
                <Route path="/SetTimer" element={<SetTimer />}></Route>
            </Routes>
          </div>
        </div>
      </div>

      {/* <!-- Footer
      <div className="footer" id="timer">
      </div> --> */}
    </BrowserRouter>
  );
}

export default App;
