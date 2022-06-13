import api from './apiServices';
import {API} from './urls';

// genres
export async function getGenres(data) {
  const res = await api.get(API.GET_GENRES);
  return res;
}

// movies by genre
export async function getMoviesByGenre(categoryId) {
  const res = await api.get(API.GET_MOVIES_BY_GENRE, {
    params: {category_id: categoryId},
  });
  return res;
}

// all movies
export async function getAllMovies() {
  const res = await api.get(API.GET_ALL_MOVIES);
  return res;
}
