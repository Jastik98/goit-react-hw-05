import css from "./MovieDetails.module.css";

const default404 =
  "https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg";

const MovieDetails = ({ details }) => {
    const releaseDate = new Date(details.release_date);
    console.log(details);
    

  return (
    <div>
      <div>
        <img
          src={
            details.poster_path
              ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
              : default404
          }
          alt={details.original_title}
          width={300}
        />
      </div>
      <div className={css.text}>
        <h2 className={css.Title}>
          {details.title} {releaseDate.getFullYear()}
        </h2>
        <p className={css.score}>User Score: {details.vote_count}</p>
        <h3 className={css.subtitle}>Overview</h3>
        <p className={css.overview}>{details.overview}</p>
        <h3 className={css.subtitle}>Genres</h3>
        <ul className={css.movieGenres}>
          {details !== null &&
            details.genres.map(({ id, name }) => (
              <li className={css.genre} key={id}>
                {name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
