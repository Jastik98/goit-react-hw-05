import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies !== null &&
        movies.map((movie) => (
          <li className={css.listItem} key={movie.id}>
            <Link
              className={css.itemLink}
              to={`/movies/${movie.id}`}
              state={location}
            >
              {movie.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MovieList;
