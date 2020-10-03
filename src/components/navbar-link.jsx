import React from 'react';
import cx from 'classnames';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

export const NavbarLink = ({ to, exact, ...props }) => {
  const active = useRouteMatch({ path: to, exact });

  return (
    <li className={cx('nav-item', { active })}>
      <Link className="nav-link" to={to} {...props} />
    </li>
  );
}
