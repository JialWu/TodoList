import React, { useState, useRef, useEffect} from 'react';

import { Button, Stack, Grid, Divider, Typography } from '@mui/material';

//import { TextField } from '@mui/material';

export default function Timer() {
  const [timer, setTimer] = useState(1500); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }

    console.log("subsequent renders");
    console.log(start);
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setStart(!start);
  };

  const toggleReset = () => {
    setStart(false);
    setTimer(1500);
  };

  const dispSecondsAsMins = (seconds) => {
    // 25:00
    console.log("seconds " + seconds);
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ === 0 ? "00" : seconds_.toString());
  };

  return (
    <Grid container>
        <Grid item xs={5}>
            <Typography variant="h2">
                {dispSecondsAsMins(timer)}
            </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem>
            Timer
        </Divider>
        <Grid item xs={3}>
            <Stack direction="row" spacing={2} sx={{ mx: 'auto', width: 150, p:3 }}>
                    <Button variant="outlined" onClick={toggleStart}>
                        {!start ? "Start" : "Stop"}
                    </Button>
                    <Button variant="contained" onClick={toggleReset}>
                        Reset
                    </Button>
                </Stack>
        </Grid>
    </Grid>
  );
};