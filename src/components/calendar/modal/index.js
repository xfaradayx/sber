import React, { useState } from "react";
import { connect } from "react-redux";

import useInput from "../../../hooks/use-input";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import DatePicker from "../../date-picker";

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
  root: {
    width: "100%",
  },
  formControl: {
    width: "100%",
    marginTop: "20px",
  },
}));

const SimpleModal = ({
  meetingList = {},
  onSave,
  onClose,
  onMeetingClose,
  ...props
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const result = useInput("");
  const resultComment = useInput("");

  const actions = {
    result: (e) => result.onChange(e.target.value),
    resultComment: (e) => resultComment.onChange(e.target.value),
  };

  const handleChange = (key) => (e) => {
    actions[key](e);
  };

  const handleMeetingClose = () => {
    const meeting = {
      ...meetingList,
      result: result.value,
      resultComment: resultComment.value,
    };

    onMeetingClose(meeting); //action setTaskDate
    onClose();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    handleMeetingClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form method='POST' onSubmit={onSubmit}>
        {Object.entries(meetingList).map(([key, val]) => {
          return key === "result" ? (
            <FormControl key={key} className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Result</InputLabel>
              <Select
                id='demo-simple-select'
                labelId='demo-simple-select-label'
                value={result.value}
                onChange={handleChange(key)}
                className={classes.input}
                name='demo-simple-select-label'
              >
                <MenuItem value={"Успех"}>Успех</MenuItem>
                <MenuItem value={"Отказ"}>Отказ</MenuItem>
              </Select>
            </FormControl>
          ) : (
            key !== "title" && (
              <TextField
                key={key}
                required={key === "resultComment" && result.value === "Отказ"}
                fullWidth
                label={key}
                defaultValue={val}
                disabled={key !== "result" && key !== "resultComment"}
                className={classes.input}
                onChange={handleChange(key)}
              />
            )
          );
        }) || {}}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='small'
          startIcon={<SaveIcon />}
          className={classes.input}
          // onClick={handleTaskUpdate}
        >
          Close meeting
        </Button>
      </form>
    </div>
  );

  return (
    <Modal onClose={onClose} {...props}>
      {body}
    </Modal>
  );
};

export default SimpleModal;
