import { combineReducers } from 'redux';

import meetings from './meetings';
import statuses from './statuses';
import tasks from './tasks';
import taskTypes from './taskTypes';

export default combineReducers({
  meetings: meetings,
  statuses: statuses,
  tasks: tasks,
  taskTypes: taskTypes,
});
