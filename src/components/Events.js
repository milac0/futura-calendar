import React, { Fragment } from "react";
import Event from "./Event";
import moment from 'moment';
import { deleteEventApi } from '../util/funcs';
import { Typography } from "@material-ui/core";

const Events = ({ events, calendarId, handleCalendarClick }) => {
  const handleDelete = async (eventId) => {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`;
    await deleteEventApi(url);
    await handleCalendarClick(calendarId);
  };

  const eventsOnDay = events.filter(event => moment().isSame(event.start.dateTime, 'day'));

  return (
    <Fragment>
      <Typography>{moment().format('MM.YYYY.')}</Typography>
      {eventsOnDay.map((event, i) => <Event key={i} event={event} calendarId={calendarId} handleDelete={handleDelete} />
    )}
    </Fragment>
  );
};

export default Events;
