import  React from 'react'

import Grid from '@mui/material/Grid';

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

Date.prototype.getMonthName = function() {
    return months[ this.getMonth() ];
};
Date.prototype.getDayName = function() {
    return days[ this.getDay() ];
};

export const DateTime = () => {
    var now = new Date();
    var day = now.getDate();
    var weekday = now.getDayName();
    var month = now.getMonthName();

    return(
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <div className="calendar">
                    <div className="weekday">{weekday}</div>
                    <div className="calendarDay">{day}</div>
                    <div className="calendarMonth">{month}</div>
                </div>
            </Grid>
            <Grid item xs={11}></Grid>
        </Grid>
    )
}

export default DateTime