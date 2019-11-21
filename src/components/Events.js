import React, { Fragment } from "react";
import Event from "./Event";
import { deleteEventApi } from '../util/funcs';

const Events = ({ events, calendarId, handleCalendarClick }) => {
  console.log(events)
  console.log('Home')
  const handleDelete = async (eventId) => {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`;
    await deleteEventApi(url);
    await handleCalendarClick(calendarId);
  };

  return (
    <Fragment>
      {events.map((event, i) => (
        <Event key={i} event={event} calendarId={calendarId} handleDelete={handleDelete} />
      ))}
    </Fragment>
  );
};

export default Events;
