import { Suspense, useEffect, useRef, useState } from 'react';
import { fetchMovieDetails } from '../../api/movies-api';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState('');
  const [score, setScore] = useState(0);

  const location = useLocation();
  const back = useRef(location.state ?? '/');

  const params = useParams();
  const { poster_path, title, release_date, vote_average, overview, genres } =
    movie;

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchMovieDetails(params.movieId);
        setMovie(data.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getTrendingMovies();
  }, [params.movieId]);

  useEffect(() => {
    if (release_date) {
      setYear(release_date.slice(0, 4));
    }
    setScore(Math.floor(vote_average * 10));
  }, [release_date, vote_average]);

  const buildNavLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.clicked);
  };

  return (
    <>
      <Link className={css.back} to={back.current}>
        <IoIosArrowRoundBack size={15} /> Go back
      </Link>
      {Object.keys(movie).length !== 0 && (
        <>
          <div className={css.box}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />

            <div className={css.boxInfo}>
              <h2>
                {title} ({year})
              </h2>
              <p>User Score: {score}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>

              <h3>Genres</h3>
              <ul className={css.list}>
                {genres.map(genre => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={css.moreInfo}>
            <p>Additional information</p>

            <ul>
              <li>
                <NavLink className={buildNavLink} to="cast">
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink className={buildNavLink} to="reviews">
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          <Suspense fallback={<p>loading...</p>}>
            <Outlet />
          </Suspense>
        </>
      )}

      {error && <p>error</p>}
      {loading && <p>loading...</p>}
    </>
  );
}
