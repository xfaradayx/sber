import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

const enchancer = applyMiddleware();

export default createStore(reducer, enchancer);
