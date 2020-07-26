import { meetings as initialState } from '../../data';
import { arrToMap } from '../utils';
import { SET_MEETING, CLOSE_MEETING } from '../constants';

export default (state = arrToMap(initialState) || {}, action) => {
  const { type, payload } = action;
  const { start, end, id, taskId, theme, comment, result, resultComment } =
    payload || {};
  switch (action.type) {
    case SET_MEETING:
      return {
        ...state,
        [id]: {
          ...payload,
        },
      };
    case CLOSE_MEETING:
      return {
        ...state,
        [id]: {
          ...state[id],
          result,
          resultComment,
        },
      };
    default:
      return state;
  }
};
