import { SET_TASK_DATE } from '../constants';

export const setTaskDate = (taskData, newValue) => ({
  type: SET_TASK_DATE,
  payload: { taskId: taskData.id, newValue },
  generateMeeting: {
    taskData,
    // start: newValue,
    // taskId,
    // start: newValue,
    // rowData
  },
});
