import * as DateUtils from 'react-day-picker/lib/DateUtils';
import * as objectPath from 'object-path';

const scheduleEntry = (state = {}, action) =>{
  switch(action.type){
    case 'SCHEDULE_UPDATE_ENTRY':
      if(!DateUtils.isSameDay(state.day, action.day)){
        return state;
      }

      return {
        ...state,
        from: action.from,
        to: action.to
      };
    default:
      return state;
  }
};
const scheduleEntryErrors = (state = {}, entry, action) =>{
  switch(action.type){
    case 'SCHEDULE_UPDATE_ENTRY':
      if(!DateUtils.isSameDay(entry.day, action.day)){
        return state;
      }

      let error = { ...state };
      if (action.from !== entry.from){
        error.from = [];
      }
      if (action.to !== entry.to){
        error.to = [];
      }

      return error;
    default:
      return state;
  }
};

const createEmptyErrors = () => ({
  name: [],
  resolution: [],
  schedule: []
});
const scheduleErrors = (state, action) =>{
  switch(action.type){
    case 'PARTICIPANT_UPDATE_NAME':
      return {
        ...state.errors,
        name: [],
      };
    case 'SCHEDULE_UPDATE_ENTRY':
      return {
        ...state.errors,
        schedule: state.errors.schedule.map((d, i) => scheduleEntryErrors(d, state.schedule[i], action)),
      };
    case 'SCHEDULE_UPDATE_RESOLUTION':
      return {
        ...state.errors,
        resolution: [],
      };
    case 'CREATE_MEETING_ERRORS':
      let errors = createEmptyErrors();
      for(let key in action.errors){
        if(action.errors.hasOwnProperty(key)){
          //noinspection JSUnresolvedFunction
          objectPath.set(errors, key, action.errors[key]);
        }
      }

      return errors;
    default:
      return state.errors;
  }
};

const meeting = (state = {
  name: '',
  visibleMonth: new Date(),
  schedule: [],
  resolution: '60',
  errors: createEmptyErrors()
}, action) =>{
  switch(action.type){
    case 'SCHEDULE_ADD_DAY':
      return {
        ...state,
        schedule: [
          ...state.schedule,
          {day: action.day}
        ]
      };
    case 'SCHEDULE_COPY_FIRST_DAY':
      let firstDay = state.schedule[0];
      return {
        ...state,
        schedule: state.schedule.map(item => ({
          ...item,
          from: firstDay.from,
          to: firstDay.to,
        }))
      };
    case 'SCHEDULE_REMOVE_DAY':
      return {
        ...state,
        schedule: state.schedule.filter(d => !DateUtils.isSameDay(d.day, action.day))
      };
    case 'PARTICIPANT_UPDATE_NAME':
      return {
        ...state,
        name: action.name,
        errors: scheduleErrors(state, action),
      };
    case 'SCHEDULE_UPDATE_ENTRY':
      return {
        ...state,
        schedule: state.schedule.map(d => scheduleEntry(d, action)),
        errors: scheduleErrors(state, action),
      };
    case 'SCHEDULE_UPDATE_RESOLUTION':
      return {
        ...state,
        resolution: action.resolution,
        errors: scheduleErrors(state, action),
      };
    case 'SCHEDULE_VISIBLE_MONTH':
      return {
        ...state,
        visibleMonth: action.month
      };
    case 'CREATE_MEETING_ERRORS':
      return {
        ...state,
        errors: scheduleErrors(state, action)
      };
    default:
      return state;
  }
};

export default meeting;
