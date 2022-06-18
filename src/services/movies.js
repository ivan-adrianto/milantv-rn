import api from './apiServices';
import {API} from './urls';

// genres
export async function getGenres(data) {
  const res = await api.get(API.GET_GENRES);
  return res;
}

// all movies
export async function getAllMovies(params) {
  const res = await api.get(API.GET_ALL_MOVIES, {params});
  return res;
}

// all movies
export async function getMovie(movieId) {
  const res = await api.get(`${API.GET_ALL_MOVIES}/${movieId}`);
  return res;
}

// create reviews
export async function createReview(data) {
  const res = await api.post(API.REVIEWS, data);
  return res;
}

// get reviews
export async function getReviewsByMovie(movieId) {
  const res = await api.get(`${API.REVIEWS}/${movieId}`);
  return res;
}

// get my reviews
export async function getMyReviews() {
  const res = await api.get(`${API.MY_REVIEWS}`);
  return res;
}

// get my reviews
export async function getReviewDetail(id) {
  const res = await api.get(`${API.MY_REVIEWS}/${id}`);
  return res;
}

// edit review
export async function editReview(data) {
  const res = await api.put(API.REVIEWS, data);
  return res;
}

// edit review
export async function deleteReview(reviewId) {
  const res = await api.delete(`${API.REVIEWS}/${reviewId}`);
  return res;
}