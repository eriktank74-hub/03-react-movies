import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const onSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      const result = await fetchMovies(query);
      if (!result.length) {
        toast("No movies found for your request.");
      }
      setMovies(result);
      setShowError(false);
    } catch (error) {
      console.log(error);
      setShowError(true)
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };
  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  }
  const onClose = () => {
    setSelectedMovie(null);
  }
  
  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : showError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={onSelect} movies={movies} />
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={onClose} />}
    </div>
  );
}

export default App;
