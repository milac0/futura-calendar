import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";

const Calendars = ({ calendars, handleCalendarClick }) => {
  return (
    <Fragment>
      {calendars.map((calendar, i) => (
        <Button
          style={{ marginBottom: "1em" }}
          onClick={() => handleCalendarClick(calendar.id)}
          key={i}
          variant="contained"
          color="primary"
        >
          {calendar.summary}
        </Button>
      ))}
    </Fragment>
  );
};

export default Calendars;
