import React, { useState } from "react";
import { connect } from "react-redux";

import useInput from "../../hooks/use-input";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import DatePicker from "../date-picker";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    "&:focus": {
      outline: "none",
    },
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
  input: {
    marginTop: "20px",
  },
}));

const SimpleModal = ({ taskData = {}, onSave, onClose, ...props }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const theme = useInput("");
  const comment = useInput("");
  const start = useInput("");

  const actions = {
    theme: (e) => theme.onChange(e.target.value),
    comment: (e) => comment.onChange(e.target.value),
    start: (e) => start.onChange(e.target.value),
  };

  const handleChange = (key) => (e) => {
    actions[key](e);
  };

  const handleTaskUpdate = () => {
    console.log("modal start", start.value);
    const data = {
      ...taskData,
      comment: comment.value,
      theme: theme.value,
      start: start.value,
    };
    onSave(data, start.value); //action setTaskDate
    onClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {Object.entries(taskData).map(([key, val]) => {
        return key === "start" ? (
          <DatePicker
            key={key}
            id='datetime-local1'
            fullWidth
            className={classes.input}
            label={key}
            onChange={handleChange(key)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : (
          <TextField
            fullWidth
            label={key}
            defaultValue={val}
            disabled={key !== "theme" && key !== "comment"}
            className={classes.input}
            onChange={handleChange(key)}
          />
        );
      })}
      <Button
        variant='contained'
        color='primary'
        size='small'
        startIcon={<SaveIcon />}
        className={classes.input}
        onClick={handleTaskUpdate}
      >
        Save
      </Button>
    </div>
  );

  return (
    <Modal onClose={onClose} {...props}>
      {body}
    </Modal>
  );
};

export default SimpleModal;
