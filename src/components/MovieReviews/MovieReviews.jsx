import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { getReviews } from "../../servise api/api";

import css from "./MovieReviews.module.css";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesReviews = async () => {
      try {
        setLoader(true);
        const {
          data: { results },
        } = await getReviews(movieId);
        setReviews(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchMoviesReviews();
  }, [movieId]);

  return (
    <div>
      {loader && <Loader />}
      {error && <NotFoundPage title={error} />}
      {reviews && !reviews.length && <NotFoundPage title="No reviews" />}
      <ul className={css.list}>
        {reviews !== null &&
          reviews.map(({ author, content }, index) => (
            <li className={css.item} key={index}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
