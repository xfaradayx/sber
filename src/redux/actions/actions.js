import { SET_TASK_DATE } from '../constants';

export const setTaskDate = (taskId, newValue) => ({
  type: SET_TASK_DATE,
  payload: { taskId, newValue },
  generateMeeting: {
    taskId,
    start: newValue,
  },
});
