import { useState, useEffect } from "react";
import { getCast } from "../../servise api/api";
import { useParams } from "react-router-dom";

import css from "./MovieCast.module.css";

import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Loader from "../Loader/Loader";

const default404 =
  "https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState(null);
 
  
  useEffect(() => {
    const fetchCast = async () => {
      setError(null);
      setLoader(true);
      try {
        const { data } = await getCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className={css.Wrapper}>
      {loader && <Loader />}
      {error && <NotFoundPage title={error} />}
      {cast && (
        <>
          <ul>
            {cast.map(({ cast_id, name, profile_path, character }) => (
              <li className={css.listItem} key={cast_id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : default404
                  }
                  alt={name}
                  width={100}
                />
                <h3>{name}</h3>
                <p>Character: {character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieCast;
