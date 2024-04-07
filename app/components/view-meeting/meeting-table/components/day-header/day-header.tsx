import { useTranslation } from 'react-i18next';

import { DATE_FORMAT, WHOLE_DAY } from '~/helpers';
import type { AttendanceResponse } from '~/components/view-meeting/types';

import { VisibilityToggle } from '../visibility-toggle/visibility-toggle';
import { AttendanceSelector } from '../attendance-selector/attendance-selector';

import './day-header.scss';

type DayHeaderProps = {
  day: Date;
  isFolded: boolean;
  participantCount: number;
  resolution: number;
  response: AttendanceResponse;
  showForm: boolean;
  onFoldChange: (folded: boolean) => void;
  onResponseChange: (response: AttendanceResponse) => void;
}

const WEEKDAY_FORMAT = {
  weekday: 'long',
};

export const DayHeader = ({
  day,
  isFolded,
  participantCount,
  resolution,
  response,
  showForm,
  onFoldChange,
  onResponseChange
}: DayHeaderProps) => {
  const { t } = useTranslation();

  return (
    <tr className="day-header">
      <td className="whole-day">
        {resolution !== WHOLE_DAY ? (
          <>
            <VisibilityToggle visible={!isFolded} onChange={onFoldChange}/>
            {showForm && t('view-meeting.whole-day')}
          </>
        ) : (
          t('view-meeting.day-of-week')
        )}
      </td>
      {resolution !== WHOLE_DAY && showForm && (
        <td className="attendance">
          <AttendanceSelector value={response} onChange={onResponseChange}/>
        </td>
      )}
      <td colSpan={participantCount + (resolution === WHOLE_DAY ? 1 : 0)} className="day">
        <div className="d-sm-none">
          {t('view-meeting.attendance.day', { val: day, formatParams: { val: WEEKDAY_FORMAT } })}
        </div>
        <div className="d-none d-sm-block">
          {t('view-meeting.attendance.day', { val: day, formatParams: { val: WEEKDAY_FORMAT } })}
          {resolution !== WHOLE_DAY && ','}
        </div>
        {resolution !== WHOLE_DAY && (
          t('view-meeting.attendance.day', { val: day, formatParams: { val: DATE_FORMAT } })
        )}
      </td>
    </tr>
  );
};
