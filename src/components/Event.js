import React from "react";
import moment from "moment";
// mui
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  box: {
    border: "1px solid grey",
    borderRadius: 2,
    maxWidth: 200,
    margin: "0.2em",
    padding: "0.25em",
    position: "relative"
  },
  deleteIcon: {
    position: "absolute",
    right: 0,
    top: 5
  }
}));

const Event = ({ event, handleDelete }) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography>
        {event.summary}
        <IconButton
          className={classes.deleteIcon}
          onClick={() => handleDelete(event.id)}
        >
          <HighlightOffIcon />
        </IconButton>
      </Typography>
      <Typography fontSize={10}>
        {moment(event.start.dateTime).format("hh:mm")}-
        {moment(event.end.dateTime).format("hh:mm DD.MM.")}
      </Typography>
    </Box>
  );
};

export default Event;
