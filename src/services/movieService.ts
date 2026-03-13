import axios from "axios";
import type {Movie} from '../types/movie'

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<{results: Movie[]}>(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`},
    },
  );
  return response.data.results as Movie[];
};
