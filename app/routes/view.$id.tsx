import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { json, LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';

import i18next from '~/i18next.server';

import { NewMeetingMessage } from '~/components/view-meeting/new-meeting-message';
import { MeetingTable, Responses } from '~/components/view-meeting/meeting-table/meeting-table';
import type { Meeting } from '~/components/view-meeting/types';
import { fetch } from '~/helpers';

import '~/components/view-meeting/index.scss';

export async function loader({ params, request }: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect('/');
  }

  const t = await i18next.getFixedT(request);
  const response = await fetch(`${process.env.API_URL}/v1/meetings/${params.id}`, {
    retries: 4,
    retryDelay: 3000,
  });
  if (response.status !== 200) {
    return redirect('/');
  }

  const meeting = await response.json() as Meeting;

  return json({
    title: `${meeting.name} - ${t('app.name')}`,
    description: t('app.view-meeting.description'),
    meeting,
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title || '' },
    { name: 'description', content: data?.description || '' },
  ];
};

const addAnswerToMeeting = (meeting: Meeting, name: string, responses: Responses): Meeting => ({
  ...meeting,
  days: meeting.days.map((day) => ({
    ...day,
    hours: day.hours.map((hour) => ({
      ...hour,
      answers: [...hour.answers, { name, answer: responses[day.day][hour.hour] }],
    }))
  }))
});

export default function ViewMeeting() {
  const { id } = useParams();
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();

  const [meeting, setMeeting] = useState<Meeting>(data.meeting as Meeting);

  if (meeting === undefined || !id) {
    toast.error(t('errors.view-meeting.not-found'));

    return redirect('/');
  }

  return (
    <div className="view-meeting">
      <ClientOnly>
        {() => <NewMeetingMessage hash={id}/>}
      </ClientOnly>
      <div className="form-group">
        <h2>{meeting.name}</h2>
      </div>
      <MeetingTable
        days={meeting.days}
        hash={id}
        resolution={meeting.resolution}
        onNewAnswer={(name, responses) => {
          setMeeting(addAnswerToMeeting(meeting, name, responses));
        }}
      />
    </div>
  );
}
