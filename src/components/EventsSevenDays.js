import React, { Fragment, useEffect, useState } from "react";
import Event from "./Event";
import moment from "moment";
import { deleteEventApi } from "../util/funcs";
//mui
import { Typography, Grid } from "@material-ui/core";
import { eventsSortByDate } from "./../util/funcs";

const EventsSevenDays = ({
  filteredEvents,
  calendarId,
  handleCalendarClick,
  date
}) => {
  const [sevenDays, setSevenDays] = useState([]);
  useEffect(() => {
    const events = [];
    const recursionFillEvents = (arr, increment) => {
      if (increment === 7) {
        return arr;
      }
      arr.push(
        eventsSortByDate(moment(date).add(increment, "day"), filteredEvents)
      );
      return recursionFillEvents(arr, increment + 1);
    };
    recursionFillEvents(events, 0);
    setSevenDays(events);
  }, [filteredEvents, date]);
  const handleDelete = async eventId => {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`;
    await deleteEventApi(url);
    await handleCalendarClick(calendarId);
  };
  const arr = [0, 1, 2, 3, 4, 5, 6];

  return (
    <Fragment>
      <Typography>
        starting date: {moment(date).format("DD.MM.YYYY")}
      </Typography>
      <Grid container>
        {sevenDays.length
          ? arr.map(a => (
              <Grid key={a} item xl={2}>
                {sevenDays[a].map((event, i) => (
                  <Event
                    key={i}
                    event={event}
                    calendarId={calendarId}
                    handleDelete={handleDelete}
                  />
                ))}
              </Grid>
            ))
          : null}
      </Grid>
    </Fragment>
  );
};

export default EventsSevenDays;
