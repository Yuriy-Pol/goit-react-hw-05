import { lazy, useEffect, useState } from 'react';
import { searchMovies } from '../../api/movies-api';
import { useSearchParams } from 'react-router-dom';

const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noMovies, setNoMovies] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');

  const getQuery = e => {
    e.preventDefault();
    const inputValue = e.target.search.value;
    setSearchParams({
      query: inputValue,
    });
    e.target.reset();
  };

  useEffect(() => {
    async function getCast() {
      try {
        if (!query) return;

        setNoMovies(false);
        setMovies([]);
        setError(false);
        setLoading(true);

        const data = await searchMovies(query);
        const results = data.data.results;
        setMovies(results);
        setNoMovies(results.length === 0);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getCast();
  }, [query]);

  return (
    <>
      <form onSubmit={getQuery}>
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>

      {Object.keys(movies).length != 0 && <MovieList movies={movies} />}

      {noMovies && <p>No movies!</p>}

      {error && <p>error</p>}
      {loading && <p>loading...</p>}
    </>
  );
}
