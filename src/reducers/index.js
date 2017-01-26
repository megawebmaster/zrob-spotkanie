import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import createMeeting from './CreateMeeting';

const app = combineReducers({
  createMeeting,
  routing: routerReducer
});

export default app;
