import { SET_TASK_DATE, CLOSE_MEETING } from '../constants';

export const setTaskDate = (taskData, newValue) => ({
  type: SET_TASK_DATE,
  payload: { taskId: taskData.id, newValue },
  generateMeeting: {
    taskData,
  },
});

export const closeMeeting = (meeting) => {
  return {
    type: CLOSE_MEETING,
    payload: { ...meeting },
  };
};
