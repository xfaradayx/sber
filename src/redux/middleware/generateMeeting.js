import moment from "moment";
import { v4 as uuid } from "uuid";

export default (store) => (next) => (action) => {
  if (!action.generateMeeting) {
    next(action);
  } else {
    const { getState } = store;
    const state = getState();

    const { taskData } = action.generateMeeting;

    const {
      id,
      clientInfo,
      status,
      start,
      theme,
      comment,
      result,
      resultComment,
    } = taskData;

    const taskHasMeeting = Object.values(state.meetings).reduce((acc, item) => {
      return item.taskId === id ? true : acc;
      // acc = item.taskId === id && true;
      // return acc;
    }, false);

    // console.log(task HasMeeting);

    if (taskHasMeeting) return;

    if (!start) return;

    next({
      type: "SET_MEETING",
      payload: {
        id: uuid(),
        taskId: id,
        start: moment(start).toDate(),
        end: moment(start).add(2, "h").toDate(),
        theme: theme || `Переговоры`,
        comment: comment || `Провести переговоры с ${clientInfo}`,
        result: result || "",
        resultComment: resultComment || "",
      },
    });

    next(action);
  }
};
