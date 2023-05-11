import React, { useState, useRef, useEffect} from 'react';

import { Button, Stack, Grid, Divider, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
        main: red[500],
        },
        secondary: {
        main: blue[400],
        },
    },
});

export default function Ppomodoro() {
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
    if (start && timer !== 0) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start, timer]);

  const toggleStart = () => {
    setStart(!start);
  };

  const toggleReset = () => {
    setStart(false);
    setTimer(1500);
  };

  const dispSecondsAsMins = (seconds) => {
    console.log("seconds " + seconds);
    const minute = Math.floor(seconds / 60);
    const second = seconds % 60;
    const m = (minute < 10 ? "0" + minute.toString() : minute.toString())
    const s = (second < 10 ? "0" + second.toString() : second.toString());
    return m + ":" + s;
  };

  return (
    <Grid container>
        <Grid item xs={5}>
            <Typography variant="h2">
                {dispSecondsAsMins(timer)}
            </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem>Pomodoro</Divider>
        <Grid item xs={3}>
            <Stack direction="row" spacing={2} sx={{ mx: 'auto', width: 150, p:3 }}>
            <ThemeProvider theme={theme}>
                <Button variant="contained" onClick={toggleStart}>
                    {!start ? "Start" : "Stop"}
                </Button>
                <Button variant="outlined" onClick={toggleReset} color="secondary">
                    Reset
                </Button>
            </ThemeProvider>
            </Stack>
        </Grid>
    </Grid>
  );
};