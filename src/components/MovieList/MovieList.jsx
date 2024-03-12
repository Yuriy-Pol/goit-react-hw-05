import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
  const from = useLocation();

  return (
    <ul>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`} state={from}>
              {movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
