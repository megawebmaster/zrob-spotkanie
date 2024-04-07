import type { AttendanceResponse } from '~/components/view-meeting/types';
import { mapObjIndexed, pipe, reduce, values } from 'ramda';

export const RESPONSE_NONE: AttendanceResponse = 'none';
export const RESPONSE_YES: AttendanceResponse = 'yes';
export const RESPONSE_MAYBE: AttendanceResponse = 'maybe';
export const RESPONSE_NO: AttendanceResponse = 'no';

export const buildResponseErrors = mapObjIndexed(
  mapObjIndexed(
    (response: AttendanceResponse) =>
      response === RESPONSE_NONE ? 'errors.view-meeting.responses.missing' : ''
  )
);

export const hasDailyResponseErrors = pipe(
  values,
  reduce(
    (dailyResult, error) => dailyResult || error !== '',
    false,
  ),
);

export const hasResponseErrors = pipe(
  values<Record<string, Record<string, string>>>,
  reduce(
    (result, dailyResponses) => result || hasDailyResponseErrors(dailyResponses),
    false,
  ),
);
