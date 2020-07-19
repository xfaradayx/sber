import { normalizedTasks as initialState } from '../../data';
import { arrToMap } from '../utils';

export default (state = arrToMap(initialState), action) => {
  const { type, payload } = action;
  switch (action) {
    case '':
      return state;
    default:
      return state;
  }
};
