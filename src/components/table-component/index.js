import React, { useState, useMemo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { setTaskDate } from '../../redux/actions/actions';

import {
  Column,
  Table,
  defaultTableRowRenderer as DefaultTableRowRenderer,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import SimpleModal from '../modal';

import DatePicker from '../date-picker';

const RowRenderer = ({ rowData, ...props }) => {
  const [_, drag] = useDrag({
    item: { type: 'table-row', taskData: { ...rowData } },
    canDrag: () => true,
    // begin: (monitor) => {},
  });

  return (
    <>
      <div
        ref={drag}
        style={{
          cursor: 'pointer',
        }}
      >
        <DefaultTableRowRenderer {...props} />
      </div>
    </>
  );
};

const TableComponent = ({ taskList, setTaskDate }) => {
  useEffect(() => {
    document.addEventListener('keydown', escapePress);

    return () => document.removeEventListener('keydown', escapePress);
  });
  const ref = useRef(null);

  const [editableCell, setEditableCell] = useState(null);
  const [editableInputVal, setEditableInputVal] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDataToModal, setTaskDataToModal] = useState({});
  const [taskDataOnDrag, setTaskDataOnDrag] = useState(null);

  const handleDbClick = (key) => (e) => {
    setEditableCell(key);
  };

  const handleUpdateTask = (taskData) => (e) => {
    const { id } = taskData;
    const currInputVal = editableInputVal[id];
    console.log('currInputVal', { ...taskData, start: currInputVal });
    setTaskDate({ ...taskData, start: currInputVal }, currInputVal);
    setEditableCell(null);
  };

  const handleChange = (taskId) => (e) => {
    setEditableInputVal((prev) => ({
      ...prev,
      [taskId]: e.target.value,
    }));
  };

  const handleClick = (taskData) => (e) => {
    console.log(taskData);
    setTaskDataToModal(taskData);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const escapePress = (e) => {
    if (editableCell) e.keyCode === 27 && setEditableCell(null);
  };

  const modalBody = useMemo(() => {
    return (
      taskDataToModal && {
        ...taskDataToModal,
        theme: '',
        comment: '',
      }
    );
  }, [taskDataToModal]);

  const cache = new CellMeasurerCache({
    defaultHeight: 80,
    minHeight: 50,
    fixedWidth: true,
  });

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
              label={'Task'}
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
              label={'Status'}
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
                        onClick={handleUpdateTask(rowData)}
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
