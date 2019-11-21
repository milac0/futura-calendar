import React, { useEffect, useState } from "react";
import { filterAccessibleCalendars, fetchApi } from "../util/funcs";
//mui
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Events from './../components/Events';
import CreateEventButton from "../components/CreateEventButton";

const useStyles = makeStyles(theme => ({
  column: {
    marginTop: "2em",
    "& hr": {
      marginBottom: "1em"
    }
  },
  calendarButton: {
    marginBottom: "1em"
  }
}));

const Home = () => {
  const classes = useStyles();
  const [calendars, setCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState('');
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchCalendarList = async () => {
      const data = await fetchApi('https://www.googleapis.com/calendar/v3/users/me/calendarList')
      const calendars = filterAccessibleCalendars(data.items);
      setCalendars(calendars);
      if(!calendarId){
        setCalendarId(calendars[0].id);
      }
      await handleCalendarClick(calendarId);
    };
    fetchCalendarList();
  },[]);

  const handleCalendarClick = async (id) => {
    if(!id){
      return;
    }
    const data = await fetchApi(`https://www.googleapis.com/calendar/v3/calendars/${id}/events`);
    setCalendarId(id);
    setEvents(data.items)
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        <Grid className={classes.column} item xs={3}>
          <CreateEventButton calendarId={calendarId} handleCalendarClick={handleCalendarClick}/>
          <hr />
          {calendars.map((calendar, i) => (
            <Button
              className={classes.calendarButton}
              onClick={() => handleCalendarClick(calendar.id)}
              key={i}
              variant="contained"
              color="primary"
            >
              {calendar.summary}
            </Button>
          ))}
        </Grid>
        <Grid className={classes.column} item xs={9}>
          <Events events={events}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
