import React from "react";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../servise api/api";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrended = async () => {
      try {
        setLoading(true);
        const { data } = await fetchMovies();
        console.log(data);

        setMovies(data.results);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrended();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <MovieList  movies={movies} />
    </div>
  );
};

export default HomePage;
