import React, { Fragment } from "react";
import Event from "./Event";
import moment from "moment";
import { deleteEventApi } from "../util/funcs";
import { Typography } from "@material-ui/core";

const Events = ({ filteredEvents, calendarId, handleCalendarClick, date }) => {
  const handleDelete = async eventId => {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`;
    await deleteEventApi(url);
    await handleCalendarClick(calendarId);
  };

  return (
    <Fragment>
      <Typography>
        starting date: {moment(date).format("DD.MM.YYYY")}
      </Typography>
      {filteredEvents.map((event, i) => (
        <Event
          key={i}
          event={event}
          calendarId={calendarId}
          handleDelete={handleDelete}
        />
      ))}
    </Fragment>
  );
};

export default Events;
