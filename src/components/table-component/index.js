import React, { useState } from "react";
import { connect } from "react-redux";
import { setTaskDate } from "../../redux/actions/actions";

import { Column, Table } from "react-virtualized";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import SimpleModal from "../modal";

import DatePicker from "../date-picker";

const TableComponent = ({ taskList, setTaskDate }) => {
  const [editableCell, setEditableCell] = useState(null);
  const [editableInputVal, setEditableInputVal] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDataToModal, setTaskDataToModal] = useState({});

  const handleDbClick = (key) => (e) => {
    setEditableCell(key);
  };

  const handleUpdateTask = (taskData) => (e) => {
    const { id } = taskData;
    const currInputVal = editableInputVal[id];

    setTaskDate({ ...taskData, start: currInputVal }, currInputVal);
    setEditableCell(null);
  };

  const handleChange = (taskId) => (e) => {
    setEditableInputVal((prev) => ({
      ...prev,
      [taskId]: e.target.value,
    }));
  };

  const handleClick = (taskData) => {
    setTaskDataToModal(taskData);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const modalBody = taskDataToModal && {
    ...taskDataToModal,
    theme: "",
    comment: "",
  };

  return (
    <>
      <Table
        width={1400}
        height={300}
        headerHeight={50}
        rowHeight={50}
        rowCount={taskList.length}
        rowGetter={({ index }) => taskList[index]}
        onRowClick={({ rowData }) => handleClick(rowData)}
      >
        <Column
          dataKey='id'
          label={"Task"}
          width={150}
          cellRenderer={({ cellData, columnData }) => <b>{cellData}</b>}
        />
        <Column
          dataKey='status'
          label={"Status"}
          width={150}
          cellRenderer={({ cellData, columnData }) => <b>{cellData}</b>}
        />
        <Column
          dataKey='clientInfo'
          label='Client info'
          width={150}
          cellRenderer={({ cellData, columnData }) => <b>{cellData}</b>}
        />
        <Column
          dataKey='taskType'
          label='Task type'
          width={150}
          cellRenderer={({ cellData, columnData }) => <b>{cellData}</b>}
        />
        <Column
          dataKey='start'
          label='Start date'
          width={400}
          cellRenderer={({ cellData, rowData, rowIndex, columnIndex }) => {
            return editableCell === `${rowIndex}x${columnIndex}` ? (
              <Grid container>
                <Grid item xs={6}>
                  <DatePicker
                    onChange={handleChange(rowData.id)}
                    id='datetime-local'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    startIcon={<SaveIcon />}
                    onClick={handleUpdateTask(rowData)}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <div onDoubleClick={handleDbClick(`${rowIndex}x${columnIndex}`)}>
                {cellData}
              </div>
            );
          }}
        />
      </Table>
      <SimpleModal
        toRender={modalBody}
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      />
    </>
  );
};

export default connect(
  (state) => ({
    taskList: Object.values(state.tasks).map((task) => {
      return {
        ...task,
        status: state.statuses[task.status].status,
        taskType: state.taskTypes[task.taskType].taskType,
      };
    }),
  }),
  {
    setTaskDate,
  }
)(TableComponent);
