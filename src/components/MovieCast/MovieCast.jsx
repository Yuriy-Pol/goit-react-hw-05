import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../api/movies-api';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

export default function MovieReviews() {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    async function getCast() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchMovieCast(params.movieId);
        setCast(data.data.cast);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getCast();
  }, [params.movieId]);

  return (
    <div className="">
      {Object.keys(cast).length !== 0 && (
        <ul>
          {cast.map(actor => {
            return (
              <li key={actor.id}>
                <img
                  className={css.img}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}

      {error && <p>error</p>}
      {loading && <p>loading...</p>}
    </div>
  );
}
