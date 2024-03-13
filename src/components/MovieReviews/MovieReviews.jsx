import { useEffect, useState } from 'react';
import { fetchMovieReview } from '../../api/movies-api';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noReviews, setNoReviews] = useState(false);

  const params = useParams();

  useEffect(() => {
    async function getCast() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchMovieReview(params.movieId);
        const results = data.data.results;
        setReviews(results);
        setNoReviews(results.length === 0);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getCast();
  }, [params.movieId]);

  if (!error) {
    return (
      <>
        {Object.keys(reviews).length !== 0 && (
          <ul>
            {reviews.map(review => {
              return (
                <li key={review.id}>
                  <h3>Author: {review.author}</h3>
                  <p>{review.content}</p>
                </li>
              );
            })}
          </ul>
        )}

        {noReviews && <p>We don&apos;t have any reviews for this movie</p>}

        {loading && <p>loading...</p>}
      </>
    );
  } else {
    return <p>error</p>;
  }
}
