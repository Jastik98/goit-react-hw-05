import React from "react";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../servise api/api";

import Loader from "../../components/Loader/Loader";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrended = async () => {
      try {
        setLoading(true);
        const { data } = await fetchMovies();
        setMovies(data.results);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrended();
  }, []);

  return (
    <Section>
      <Container>
        <h1>Trending today</h1>
        {loading && <Loader />}
        {error && <NotFoundPage title={error} />}
        {movies && <MovieList movies={movies} />}
      </Container>
    </Section>
  );
};

export default HomePage;
