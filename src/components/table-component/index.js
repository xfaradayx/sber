import React, { useState } from 'react';
import { Column, Table } from 'react-virtualized';

import { connect } from 'react-redux';

const TableComponent = ({ taskList }) => {
  return (
    <Table
      width={800}
      height={300}
      headerHeight={50}
      rowHeight={30}
      rowCount={taskList.length}
      rowGetter={({ index }) => taskList[index]}
      onRowClick={({ rowData }) => console.log(rowData)}
    >
      <Column dataKey='id' label={'Task'} width={200} />
      <Column dataKey='status' label={'Status'} width={200} />
      <Column dataKey='clientInfo' label='Client info' width={200} />
      <Column dataKey='taskType' label='Task type' width={200} />
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
  null
)(TableComponent);
