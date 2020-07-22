import moment from 'moment';
import { v4 as uuid } from 'uuid';

export default (store) => (next) => (action) => {
  if (!action.generateMeeting) next(action);

  const { dispatch } = store;
    console.log(moment(action.generateMeeting.start).toDate(), moment(action.generateMeeting.start).add(2, 'h').toDate());
    next({
      type: 'SET_MEETING',
      payload: {
        taskId: action.generateMeeting.taskId,
        start: moment(action.generateMeeting.start).toDate(),
        end: moment(action.generateMeeting.start).add(2, 'h').toDate(),
        id: uuid(),
        theme: 'from middleware',
      },
    });

  next(action);
};
