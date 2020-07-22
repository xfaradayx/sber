import moment from 'moment';
import { v4 as uuid } from 'uuid';

export default (store) => (next) => (action) => {
  if (!action.generateMeeting) next(action);

  const { dispatch } = store;
  const { generateMeeting } = action;

  // dispatch({
  //   type: 'SET_MEETING',
  //   payload: {
  //     taskId: action.generateMeeting.taskId,
  //     start: moment(generateMeeting.start).toDate(),
  //     end: moment(generateMeeting.start).add(2, 'h').toDate(),
  //     id: uuid(),
  //     theme: 'from middleware',
  //   },
  // });

  next(action);
};
