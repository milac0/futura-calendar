import React, { Fragment, useState } from "react";
import moment from "moment";
import { postEventApi, addEndTimeOnDate } from "../util/funcs";
//mui
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles(theme => ({
  calendarButton: {
    marginBottom: "1.5em"
  },
  dialogInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dialog: {
    padding: "1em"
  }
}));

const CreateEventButton = ({ calendarId, handleCalendarClick }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [selectedDate, handleDateChange] = useState(moment());
  const [endTime, handleEndTime] = useState(moment().add(1, "hour"));

  const handleClick = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSummary("");
  };

  const handleSummary = e => setSummary(e.target.value);

  // w/o input validation
  const handleCreate = async () => {
    const start = moment(selectedDate).toISOString();
    const end = moment(endTime).toISOString();
    const endOnSameDay = addEndTimeOnDate(start, end);
    
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
    const dataBody = {
      summary,
      start: { dateTime: start },
      end: { dateTime: endOnSameDay }
    };
    await postEventApi(url, dataBody);
    handleCalendarClick(calendarId);
    handleClose();
  };

  return (
    <Fragment>
      <Button
        onClick={handleClick}
        className={classes.calendarButton}
        variant="contained"
        color="secondary"
      >
        Create
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <TextField
          id="standard-basic"
          className={classes.dialogInput}
          label="Add title"
          margin="normal"
          value={summary}
          onChange={handleSummary}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            className={classes.dialogInput}
            value={selectedDate}
            onChange={handleDateChange}
          />
          <TimePicker
            className={classes.dialogInput}
            value={selectedDate}
            onChange={handleDateChange}
          />
          <TimePicker
            className={classes.dialogInput}
            value={endTime}
            onChange={handleEndTime}
          />
        </MuiPickersUtilsProvider>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreateEventButton;
