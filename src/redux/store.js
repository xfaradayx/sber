import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import generateMeeting from './middleware/generateMeeting';

const enchancer = applyMiddleware(generateMeeting);

export default createStore(reducer, composeWithDevTools(enchancer));
