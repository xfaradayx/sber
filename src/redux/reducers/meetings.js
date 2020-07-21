import { meetings as initialState } from '../../data';
import { arrToMap } from '../utils';
import { SET_MEETING } from '../constants';

export default (state = arrToMap(initialState), action) => {
  const { type, payload } = action;

  switch (action.type) {
    case SET_MEETING:
      const { start, end, id, taskId, theme } = payload || {};
      return {
        ...state,
        [id]: {
          ...payload,
        },
      };
    default:
      return state;
  }
};
