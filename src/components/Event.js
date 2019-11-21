import React, { Fragment } from "react";
import moment from "moment";

const Event = ({ event }) => {
  return (
    <Fragment>
      <h5>{event.summary}</h5>
      <p>
        {moment(event.start.dateTime).format("hh:mm")}-
        {moment(event.end.dateTime).format("hh:mm")}
      </p>
    </Fragment>
  );
};

export default Event;
