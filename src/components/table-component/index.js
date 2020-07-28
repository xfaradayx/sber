import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { setTaskDate } from "../../redux/actions/actions";

import {
  Column,
  Table,
  defaultTableRowRenderer as DefaultTableRowRenderer,
  AutoSizer,
} from "react-virtualized";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import SimpleModal from "../modal";
import DatePicker from "../date-picker";
import RowRenderer from "./row-renderer";

import ctx from "./util";

const TableComponent = ({ taskList, setTaskDate }) => {
  const { actions, state } = ctx();
  console.log(actions, state);
  const { isModalOpen, taskDataToModal, editableCell } = state;
  const {
    handleDbClick,
    handleUpdateTask,
    handleChange,
    handleClick,
    handleCloseModal,
    escapePress,
  } = actions;

  useEffect(() => {
    document.addEventListener("keydown", escapePress);

    return () => document.removeEventListener("keydown", escapePress);
  });

  const modalBody = useMemo(() => {
    return (
      taskDataToModal && {
        ...taskDataToModal,
        theme: "",
        comment: "",
      }
    );
  }, [taskDataToModal]);

  return (
    <>
      <AutoSizer>
        {({ width, height }) => (
          <Table
            width={width}
            height={height}
            headerHeight={50}
            rowHeight={50}
            rowCount={taskList.length}
            rowGetter={({ index }) => taskList[index]}
            rowRenderer={(props) => <RowRenderer {...props} />}
          >
            <Column
              dataKey='id'
              label={"Task"}
              width={150}
              cellRenderer={({ rowData, cellData }) => (
                <div onClick={handleClick(rowData)}>
                  <a href='' onClick={(e) => e.preventDefault()}>
                    {cellData}
                  </a>
                </div>
              )}
            />
            <Column
              dataKey='status'
              label={"Status"}
              width={150}
              cellRenderer={({ cellData }) => <b>{cellData}</b>}
            />
            <Column
              dataKey='clientInfo'
              label='Client info'
              width={150}
              cellRenderer={({ cellData }) => <b>{cellData}</b>}
            />
            <Column
              dataKey='taskType'
              label='Task type'
              width={150}
              cellRenderer={({ cellData }) => <b>{cellData}</b>}
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
                        onClick={handleUpdateTask(rowData, setTaskDate)}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <div
                    onDoubleClick={handleDbClick(`${rowIndex}x${columnIndex}`)}
                  >
                    {cellData}
                  </div>
                );
              }}
            />
          </Table>
        )}
      </AutoSizer>
      <SimpleModal
        taskData={modalBody}
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={setTaskDate}
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
