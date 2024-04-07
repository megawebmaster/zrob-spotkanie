import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from '@remix-run/react';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useChangeLanguage } from 'remix-i18next/react';
import { useTranslation } from 'react-i18next';

import i18next from '~/i18next.server';
import './root.scss';
import React from 'react';
import { Navbar } from '~/components/navbar';

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  return json({ locale });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  // useChangeLanguage(locale);

  return (
    <html lang="pl" dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta/>
        <Links/>
      </head>
      <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="container navbar-expand">
      <Navbar />
      <Outlet/>
    </div>
  );
}
