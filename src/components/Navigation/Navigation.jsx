import React from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import clsx from "clsx";

import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <Container>
      <header>
        <nav>
          <ul className={css.header}>
            <li className={css.navList}>
              <NavLink className={buildLinkClass} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={buildLinkClass} to="/movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};

export default Navigation;
