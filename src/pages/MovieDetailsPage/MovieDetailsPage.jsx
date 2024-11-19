import { useState, useEffect, useRef, Suspense } from "react";
import css from "./MovieDetailsPage.module.css";
import { getMovie } from "../../servise api/api";

import clsx from "clsx";
import {
  useLocation,
  NavLink,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";

import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

import Section from "../../components/Section/section";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const classAdd = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const { movieId } = useParams();

  const location = useLocation();
  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    const filmDetails = async () => {
      setErrorDetails(null);
      setLoadingDetails(true);

      try {
        const { data } = await getMovie(movieId);
        setDetails(data);
      } catch (err) {
        setErrorDetails(err.message);
      } finally {
        setLoadingDetails(false);
      }
    };

    filmDetails();
  }, [movieId]);
  return (
    <Section>
      <Container>
        <Link className={css.backLink} to={backLink.current}>
          <IconContext.Provider value={{ color: "gray", size: 30 }}>
            <IoChevronBackCircleOutline />
          </IconContext.Provider>
          Back
        </Link>
        {loadingDetails && <Loader />}
        {errorDetails && <NotFoundPage title={errorDetails} />}
        {details && <MovieDetails details={details} />}
        {!errorDetails && (
          <>
            <ul className={css.list}>
              <li className={css.listItem}>
                <NavLink className={classAdd} to="cast">
                  Cast
                </NavLink>
              </li>
              <li className={css.listItem}>
                <NavLink className={classAdd} to="reviews">
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </>
        )}
      </Container>
    </Section>
  );
};

export default MovieDetailsPage;
