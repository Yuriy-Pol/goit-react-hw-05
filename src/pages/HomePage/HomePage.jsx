import { lazy, useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/movies-api';

const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchTrendingMovies();
        setTrendingMovies(data.data.results);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>

      <MovieList movies={trendingMovies} />

      {error && <p>error</p>}
      {loading && <p>loading...</p>}
    </div>
  );
}
