import moment from 'moment';
import DeepMerge from 'deep-merge';

const answersToResponses = (responses, answer) =>{
  responses[answer.name] = answer.answer;

  return responses;
};
const hoursToResponses = (responses, hour) =>{
  responses[hour.hour] = hour.answers.reduce(answersToResponses, {});

  return responses;
};
const daysToResponses = (responses, event) =>{
  let day = moment(event.day, 'YYYY-MM-DD').format('YYYY-MM-DD');
  responses[day] = event.hours.reduce(hoursToResponses, {});

  return responses;
};
const getAvailableHours = (event, resolution) =>{
  let hours = [];
  let from = moment(event.from, 'HH:mm');
  let to = moment(event.to, 'HH:mm');
  for(let i = from; i.isBefore(to); i.add(resolution, 'minutes')){
    hours.push(moment(i));
  }

  return hours;
};
const daysMerger = (person) =>{
  return (target, source) => ({...target, [person]: source});
};

const meeting = (state = {
                   hash: '',
                   name: '',
                   resolution: 60,
                   schedule: [],
                   responses: {},
                 }, action) =>{
  switch(action.type){
    case 'MEETING_FETCHED':
      return {
        hash: action.meeting.hash,
        name: action.meeting.name,
        resolution: parseInt(action.meeting.resolution, 10),
        schedule: action.meeting.days.map(event => ({
          ...event,
          day: moment(event.day, 'YYYY-MM-DD'),
          available_hours: getAvailableHours(event, action.meeting.resolution)
        })),
        responses: action.meeting.days.reduce(daysToResponses, {})
      };
    case 'RESPONSE_SAVED':
      let merge = DeepMerge(daysMerger(action.response.name));
      return {
        ...state,
        responses: merge(state.responses, action.response.responses)
      };
    default:
      return state;
  }
};

const setHourResponse = (response, responses, hour) =>{
  responses[hour.format('HH:mm')] = response;
  return responses;
};

const response = (state = {
                    name: '',
                    responses: {},
                    foldedDays: {},
                    hasResponded: false,
                  }, action) =>{
  switch(action.type){
    case 'RESPONSE_UPDATE_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'RESPONSE_FOLD_DAY':
      return {
        ...state,
        foldedDays: {
          ...state.foldedDays,
          [action.event.day.format('YYYY-MM-DD')]: action.isFolded
        }
      };
    case 'RESPONSE_UPDATE_DAY':
      let formattedDay = action.event.day.format('YYYY-MM-DD');
      let dayResponse = action.event.available_hours.reduce(setHourResponse.bind(this, action.response), {});
      return {
        ...state,
        responses: {
          ...state.responses,
          [formattedDay]: dayResponse
        },
        foldedDays: {
          ...state.foldedDays,
          [formattedDay]: true
        }
      };
    case 'RESPONSE_UPDATE_DAY_AND_HOUR':
      // TODO: Check for proper folding ;)
      formattedDay = action.day.format('YYYY-MM-DD');
      return {
        ...state,
        responses: {
          ...state.responses,
          [formattedDay]: {
            ...state.responses[formattedDay],
            [action.hour.format('HH:mm')]: action.response
          }
        }
      };
    case 'RESPONSE_SAVED':
      return {
        ...state,
        foldedDays: {},
        hasResponded: true
      };
    case 'RESPONSE_NEW':
      return {
        ...response(undefined, {}),
        hasResponded: false
      };
    default:
      return state;
  }
};

const createEmptyErrors = () => ({
  name: [],
  responses: [],
});

const stateHasResponseErrors = state =>{
  return state.hasOwnProperty('errors') && state.errors.hasOwnProperty('responses') &&
    Object.keys(state.errors.responses).length > 0;
};

const filterObject = (obj, predicate) => {
  let result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && predicate(key, obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
};

const responseErrors = (state = {errors: {responses: {}}}, action) =>{
  switch(action.type){
    case 'RESPONSE_UPDATE_DAY_AND_HOUR':
      if(!stateHasResponseErrors(state)){
        return {};
      }
      let dayErrors = state.errors.responses[action.day.format('YYYY-MM-DD')];
      return {
        ...state.errors.responses,
        [action.day.format('YYYY-MM-DD')]: filterObject(dayErrors, key => action.hour.format('HH:mm') !== key)
      };
    case 'RESPONSE_UPDATE_DAY':
      if(!stateHasResponseErrors(state)){
        return {};
      }
      return filterObject(state.errors.responses, key => action.event.day.format('YYYY-MM-DD') !== key);
    case 'RESPONSE_SAVE_ERROR':
      if(!action.hasOwnProperty('error') || !action.error.hasOwnProperty('response')){
        return state.errors.responses;
      }

      let schedule = state.meeting.schedule;
      let responses = state.response.responses;
      let errors = {};

      schedule.forEach(item =>{
        let formattedDay = item.day.format('YYYY-MM-DD');
        errors[formattedDay] = {};
        if(!responses.hasOwnProperty(formattedDay)){
          item.hours.forEach(hour =>{
            errors[formattedDay][hour.hour] = 'Brak odpowiedzi';
          });
        } else {
          item.hours.forEach(hour =>{
            if(!responses[formattedDay].hasOwnProperty(hour.hour)){
              errors[formattedDay][hour.hour] = 'Brak odpowiedzi';
            }
          });
        }
      });

      return errors;
    default:
      return state.errors.responses;
  }
};

const errors = (state = {errors: createEmptyErrors()}, action) =>{
  switch(action.type){
    case 'RESPONSE_UPDATE_NAME':
      return {
        ...state.errors,
        name: []
      };
    case 'RESPONSE_UPDATE_DAY':
    case 'RESPONSE_UPDATE_DAY_AND_HOUR':
      return {
        ...state.errors,
        responses: responseErrors(state, action),
      };
    case 'RESPONSE_SAVE_ERROR':
      return {
        name: action.error.name,
        responses: responseErrors(state, action),
      };
    default:
      return state.errors;
  }
};

const view = (state = {
                isLoading: true,
                meeting: meeting(undefined, {}),
                participants: [],
                response: response(undefined, {}),
                errors: errors(undefined, {}),
              }, action) =>{
  switch(action.type){
    case 'MEETING_REQUESTED':
      return {
        ...state,
        isLoading: true
      };
    case 'MEETING_FETCHED':
      let participants = [];
      if(action.meeting.days.length > 0 && action.meeting.days[0].hours.length > 0){
        participants = action.meeting.days[0].hours[0].answers.map(answer => answer.name);
      }

      return {
        ...state,
        isLoading: false,
        meeting: meeting(state.meeting, action),
        participants
      };
    case 'RESPONSE_UPDATE_NAME':
      return {
        ...state,
        response: response(state.response, action),
        errors: errors(state, action),
      };
    case 'RESPONSE_FOLD_DAY':
      return {
        ...state,
        response: response(state.response, action)
      };
    case 'RESPONSE_UPDATE_DAY':
      return {
        ...state,
        response: response(state.response, action),
        errors: errors(state, action),
      };
    case 'RESPONSE_UPDATE_DAY_AND_HOUR':
      return {
        ...state,
        response: response(state.response, action),
        errors: errors(state, action),
      };
    case 'RESPONSE_SAVED':
      return {
        ...state,
        response: response(state.response, action),
        meeting: meeting(state.meeting, action),
        participants: [...state.participants, action.response.name],
        errors: errors(undefined, {})
      };
    case 'RESPONSE_SAVE_ERROR':
      return {
        ...state,
        errors: errors(state, action),
      };
    case 'RESPONSE_NEW':
      return {
        ...state,
        response: response(state.response, action)
      };
    default:
      return state;
  }
};

export default view;
