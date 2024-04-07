import type { AttendanceResponse } from '~/components/view-meeting/meeting-table/helpers';

export type MeetingAnswer = {
  name: string;
  answer: AttendanceResponse;
}

export type MeetingHour = {
  hour: string;
  answers: MeetingAnswer[];
};

export type MeetingDay = {
  day: string;
  from: string;
  to: string;
  hours: MeetingHour[];
};

export type Meeting = {
  hash: string;
  name: string;
  resolution: number;
  days: MeetingDay[];
};

export type AttendanceResponse = 'none' | 'yes' | 'maybe' | 'no';
