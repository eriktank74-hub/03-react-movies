import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    
  document.body.style.overflow = 'hidden';
      
    return () => {
      document.body.style.overflow = 'initial';
    }
  }, []);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {Math.round(movie.vote_average)}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default MovieModal;
