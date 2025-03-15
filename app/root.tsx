import type { ReactNode } from 'react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from '@remix-run/react';
import { useChangeLanguage } from 'remix-i18next/react';
import { useTranslation } from 'react-i18next';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from '~/components/navbar';
import i18next from '~/i18next.server';
import i18nConfig from '~/i18n';

import './root.scss';

export async function loader({ request }: LoaderFunctionArgs) {
  return {
    locale: await i18next.getLocale(request),
    ENV: {
      API_URL: process.env.API_URL,
    },
  };
}

export function Layout({ children }: { children: ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const locale = data?.locale || i18nConfig.fallbackLng;

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(data?.ENV || {})}`,
      }}
    />
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
      <Navbar/>
      <Outlet/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

declare global {
  interface Window {
    ENV: Record<string, string>;
  }
}
