import { Link, LinkProps, useMatch } from '@remix-run/react';
import cx from 'clsx';

type NavbarLinkProps = {
  to: string;
  exact?: boolean;
} & LinkProps;

export const NavbarLink = ({ to, exact, prefetch, ...props }: NavbarLinkProps) => {
  const active = useMatch(`${to}${exact ? '' : '/*'}`);

  return (
    <li className={cx('nav-item', { active })}>
      <Link className="nav-link" to={to} {...props} />
    </li>
  );
};
