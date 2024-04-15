import buildFetchWithRetry from 'fetch-retry';
export const WHOLE_DAY = 1440;
export const DATE_FORMAT = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const fetch = buildFetchWithRetry(globalThis.fetch);
