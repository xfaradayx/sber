import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTaskDate } from '../../redux/actions/actions';

import { Column, Table } from 'react-virtualized';

import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DatePicker from '../date-picker';

const TableComponent = ({ taskList, setTaskDate }) => {
  const [editableCell, setEditableCell] = useState(null);
  const [editableInputVal, setEditableInputVal] = useState({});

  const handleDbClick = (key) => (e) => {
    setEditableCell(key);
  };

  const handleUpdateTask = (taskId) => (e) => {
    // console.log('data: ', taskId, ' ', editableInputVal[taskId]);
    const currInputVal = editableInputVal[taskId];
    setTaskDate(taskId, currInputVal);
    setEditableCell(null);
  };

  const handleChange = (taskId) => (e) => {
    setEditableInputVal((prev) => ({
      ...prev,
      [taskId]: e.target.value,
    }));
  };

  const handleSubmit = (id) => {};

  return (
    <Table
      width={1200}
      height={300}
      headerHeight={50}
      rowHeight={50}
      rowCount={taskList.length}
      rowGetter={({ index }) => taskList[index]}
    >
      <Column
        dataKey='id'
        label={'Task'}
        width={150}
        cellRenderer={({ cellData, columnData }) => <b>{cellData}</b>}
      />
      <Column
        dataKey='status'
        label={'Status'}
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
                <DatePicker onChange={handleChange(rowData.id)} />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  startIcon={<SaveIcon />}
                  onClick={handleUpdateTask(rowData.id)}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          ) : (
            // <div>
            //   <input
            //     type='text'
            //     onChange={handleChange(rowData.id)}
            //     value={editableInputVal[rowData.id]}
            //   />
            //   <button onClick={handleUpdateTask(rowData.id)}>Submit</button>
            // </div>
            <div onDoubleClick={handleDbClick(`${rowIndex}x${columnIndex}`)}>
              {cellData}
            </div>
          );
        }}
      />
    </Table>
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
