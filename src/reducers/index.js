import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import createMeeting from './CreateMeeting';
import viewMeeting from './ViewMeeting';

const app = combineReducers({
  createMeeting,
  viewMeeting,
  routing: routerReducer
});

export default app;
