import { normalizedTasks as initialState } from '../../data';
import { arrToMap } from '../utils';

import { SET_TASK_DATE } from '../constants';

export default (state = arrToMap(initialState), action) => {
  const { type, payload } = action;
  // const { taskId, newValue } = payload || {};

  switch (action.type) {
    case SET_TASK_DATE:
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          start: payload.newValue,
        },
      };
    default:
      return state;
  }
};
