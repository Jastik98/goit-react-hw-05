import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "../../servise api/api";

import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import Form from "../../components/Form/Form";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      setLoader(true);
      setMovies(null);
      try {
        setError(null);
        const { data } = await getMovies(query);
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [query]);

  const getSearchQuery = (query) => {
    setSearchParams({ query });
  };

  return (
    <Section>
      <Container>
        <Form getSearchQuery={getSearchQuery} prevValue={query} />
        {loader && <Loader />}
        {movies && !movies.length && <NotFoundPage title="No Movies" />}
        {error && <NotFoundPage title={error} />}
        {movies && movies.length >= 1 && (
          <MovieList query={query} movies={movies} />
        )}
      </Container>
    </Section>
  );
};
export default MoviesPage;
