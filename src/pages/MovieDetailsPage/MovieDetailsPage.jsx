import { useState, useEffect, useRef, Suspense } from "react";
import {
  useLocation,
  NavLink,
  Link,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";
import { fetchTrendedDetails } from "../../servise api/api";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

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

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  const fileId = location.pathname.split("/").filter(Boolean).pop();

  const handleNavigate = (pathParam) => {
    const nextPath = `${location.pathname}/${pathParam}`;
    navigate(nextPath);
  };

  useEffect(() => {
    const filmDetails = async () => {
      setErrorDetails(null);
      setLoadingDetails(true);

      try {
        const response = await fetchTrendedDetails(fileId);
        setDetails(response);
      } catch (err) {
        setErrorDetails(err.message);
      } finally {
        setLoadingDetails(false);
      }
    };

    filmDetails();
  }, [fileId]);
  return (
    <div className={css.Wrapper}>
      <Link className={css.backLink} to={backLinkRef.current}>
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
    </div>
  );
};

export default MovieDetailsPage;
