import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

export default function Navigation() {
  const buildNavLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <nav className={css.nav}>
      <NavLink className={buildNavLink} to="/">
        Home
      </NavLink>
      <NavLink className={buildNavLink} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
