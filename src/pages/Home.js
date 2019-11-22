import React, { useEffect, useState, Fragment } from "react";
import {
  filterAccessibleCalendars,
  fetchApi,
  eventsOnDays
} from "../util/funcs";
import moment from "moment";
import Events from "./../components/Events";
import CreateEventButton from "../components/CreateEventButton";
import Calendars from "../components/Calendars";
import FilterTime from "../components/FilterTime";
//mui
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventsSevenDays from "./../components/EventsSevenDays";

const useStyles = makeStyles(theme => ({
  column: {
    marginTop: "2em",
    "& hr": {
      margin: 0,
      marginBottom: "1em",
      width: 100
    }
  },
  controls: {
    width: 400,
    margin: "0 auto"
  }
}));

const Home = () => {
  const classes = useStyles();
  const [calendars, setCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState("");
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(moment());
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [timeframe, setTimeframe] = useState(7);

  useEffect(() => {
    const fetchCalendarList = async () => {
      const data = await fetchApi(
        "https://www.googleapis.com/calendar/v3/users/me/calendarList"
      );
      const calendars = filterAccessibleCalendars(data.items);
      setCalendars(calendars);
      if (calendarId === "") {
        setCalendarId(calendars[0].id);
      }
      await handleCalendarClick(calendarId);
    };
    fetchCalendarList();
  }, [calendarId]);

  const handleCalendarClick = async id => {
    if (!id) {
      return;
    }
    const data = await fetchApi(
      `https://www.googleapis.com/calendar/v3/calendars/${id}/events`
    );
    setCalendarId(id);
    setEvents(data.items);
    setFilteredEvents(
      eventsOnDays(date, moment(date).add(timeframe, "days"), data.items)
    );
  };

  const handleDateChange = newDate => {
    setDate(newDate);
    const toDate = moment(newDate).add(timeframe, "days");
    setFilteredEvents(eventsOnDays(newDate, toDate, events));
  };

  const handleFilterBy = filter => {
    setFilteredEvents(
      eventsOnDays(date, moment(date).add(filter, "days"), events)
    );
    setTimeframe(filter);
  };

  return (
    <Fragment>
      <div className={classes.controls}>
        <FilterTime filterBy={handleFilterBy} />
        <Button
          onClick={() =>
            handleDateChange(moment(date).subtract(timeframe, "day"))
          }
        >
          {"<"}
        </Button>
        <Button
          onClick={() => handleDateChange(moment(date).add(timeframe, "day"))}
        >
          {">"}
        </Button>
      </div>
      <Grid container spacing={5}>
        <Grid className={classes.column} item xs={2}>
          <CreateEventButton
            calendarId={calendarId}
            handleCalendarClick={handleCalendarClick}
          />
          <hr />
          <Calendars
            calendars={calendars}
            handleCalendarClick={handleCalendarClick}
          />
        </Grid>
        <Grid className={classes.column} item xs={10}>
          {timeframe === 1 ? (
            <Events
              filteredEvents={filteredEvents}
              calendarId={calendarId}
              handleCalendarClick={handleCalendarClick}
              date={date}
            />
          ) : timeframe === 7 ? (
            <EventsSevenDays
              filteredEvents={filteredEvents}
              calendarId={calendarId}
              handleCalendarClick={handleCalendarClick}
              date={date}
            />
          ) : (
            <Events
              filteredEvents={filteredEvents}
              calendarId={calendarId}
              handleCalendarClick={handleCalendarClick}
              date={date}
            />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
