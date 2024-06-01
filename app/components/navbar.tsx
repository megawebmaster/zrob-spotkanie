import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { NavbarLink } from './navbar-link';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand" to="/">
      <span className="d-none d-sm-block">
        {t('app.name')}
      </span>
        <i className="fa-solid fa-calendar d-sm-none"/>
      </Link>
      <ul className="navbar-nav">
        <NavbarLink to="/" exact>
          {t('links.newMeeting')}
        </NavbarLink>
        <NavbarLink to="/how-it-works">
          {t('links.howItWorks')}
        </NavbarLink>
      </ul>
    </nav>
  );
};
