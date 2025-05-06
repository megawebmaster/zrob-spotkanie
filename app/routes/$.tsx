import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { redirect } from 'react-router';
import { useTranslation } from 'react-i18next';

import i18next from '~/i18next.server';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `404 - ${data.title ?? ''}` },
    {
      name: 'description',
      content: data.description ?? '',
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  const t = await i18next.getFixedT(locale);

  return {
    title: t('app.name'),
    description: t('404.description'),
  };
};

export function action() {
  return redirect('/');
}

export default function Rest() {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <h1>
        {t('404.page.title')}
      </h1>
      <p>{t('404.page.content')}</p>
      <ul>
        <li>
          <Link to="/">
            {t('links.newMeeting')}
          </Link>
        </li>
        <li>
          <Link to="/how-it-works">
            {t('links.howItWorks')}
          </Link>
        </li>
      </ul>
    </div>
  );
}
