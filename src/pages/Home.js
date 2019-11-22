import React, { useEffect, useState } from "react";
import { filterAccessibleCalendars, fetchApi, eventsOnDay } from "../util/funcs";
import moment from 'moment';import Events from './../components/Events';
import CreateEventButton from "../components/CreateEventButton";
import Calendars from "../components/Calendars";
//mui
import Grid from "@material-ui/core/Grid";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  column: {
    marginTop: "2em",
    "& hr": {
      margin: 0,
      marginBottom: "1em",
      width: 100,
    }
  }
}));

const Home = () => {
  const classes = useStyles();
  const [calendars, setCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState('');
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(moment());
  const [filteredEvents, setFilteredEvents] = useState([])
  const [timeframe, setTimeframe] = useState(1)
  useEffect(() => {
    const fetchCalendarList = async () => {
      const data = await fetchApi('https://www.googleapis.com/calendar/v3/users/me/calendarList')
      const calendars = filterAccessibleCalendars(data.items);
      setCalendars(calendars);
      if(calendarId === ''){
        setCalendarId(calendars[0].id);
      }
      await handleCalendarClick(calendarId);
    };
    fetchCalendarList();
  },[calendarId]);

  const handleCalendarClick = async (id) => {
    if(!id){
      return;
    }
    const data = await fetchApi(`https://www.googleapis.com/calendar/v3/calendars/${id}/events`);
    setCalendarId(id);
    setEvents(data.items);
    setFilteredEvents(eventsOnDay(date, data.items))
  }

  const handleDateChange = (newDate) => {
    setDate(newDate)
    setFilteredEvents(eventsOnDay(newDate, events))
  }

  return (
    <Container maxWidth="lg">
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
      <Button onClick={() => handleDateChange(moment(date).subtract(timeframe, 'day'))}>{"<"}</Button>
      <Button onClick={() => handleDateChange(moment(date).add(timeframe, 'day'))}>{">"}</Button>
      <Grid container spacing={5}>
        <Grid className={classes.column} item xs={4}>
          <CreateEventButton calendarId={calendarId} handleCalendarClick={handleCalendarClick}/>
          <hr />
          <Calendars calendars={calendars} handleCalendarClick={handleCalendarClick} />
        </Grid>
        <Grid className={classes.column} item xs={8}>
          <Events filteredEvents={filteredEvents} calendarId={calendarId} handleCalendarClick={handleCalendarClick} date={date}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;