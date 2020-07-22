import moment from 'moment';
import { v4 as uuid } from 'uuid';

export default (store) => (next) => (action) => {
  if (!action.generateMeeting) next(action);

  const { getState } = store;
  const state = getState();

  const { taskData } = action.generateMeeting;
  const { id, status, start, clientInfo, result, resultComment } = taskData;

  const taskHasMeeting = Object.values(state.meetings).reduce((acc, item) => {
    return item.taskId === id && true;
  }, false);

  if (!taskHasMeeting) {
    next({
      type: 'SET_MEETING',
      payload: {
        id: uuid(),
        taskId: id,
        start: moment(start).toDate(),
        end: moment(start).add(2, 'h').toDate(),
        theme: `Переговоры`,
        comment: `Провести переговоры с ${clientInfo}`,
        result: result || '',
        resultComment: resultComment || '',
      },
    });
  }

  next(action);
};
