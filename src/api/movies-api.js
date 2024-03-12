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
  return axios.get('trending/movie/day');
}

export function fetchMovieDetails(id) {
  return axios.get(`movie/${id}`);
}

export function fetchMovieCast(id) {
  return axios.get(`movie/${id}/credits`);
}

export function fetchMovieReview(id) {
  return axios.get(`movie/${id}/reviews`);
}

export function searchMovies(query) {
  return axios.get('search/movie', {
    params: {
      query,
    },
  });
}
