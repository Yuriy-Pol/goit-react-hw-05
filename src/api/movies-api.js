import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

axios.defaults.headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODJjMzYyN2RkMTE1MzhhMmYxN2ZjMjVjMjkzYTYxYiIsInN1YiI6IjY1ZWMyYzlmYjdkMzUyMDE3YmU1YzkxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LMB_mf88g-NyiQVYQUtQ2Xm-QYI-W1VrMIzV9LGoA_Y',
};
axios.defaults.params = {
  key: 'a82c3627dd11538a2f17fc25c293a61b',
};

export function fetchTrendingMovies() {
  return axios.get(
    'https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1'
  );
}

export function fetchMovieDetails(id) {
  return axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
}

export function fetchMovieCast(id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
  );
}

export function fetchMovieReview(id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`
  );
}

export function searchMovies(query) {
  return axios.get('search/movie', {
    params: {
      query,
    },
  });
}
