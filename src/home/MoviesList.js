import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../shared/ErrorAlert";
import { listMovies } from "../utils/api";
import "../MoviesList.css";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const abortController = new AbortController();

    // Set loading to true when starting to fetch data
    setLoading(true);

    listMovies(abortController.signal)
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        // Set loading to false when data is loaded or an error occurs
        setLoading(false);
      });

    return () => abortController.abort();
  }, []);

  const list = movies.map((movie) => (
    <article key={movie.movie_id} className="col-sm-12 col-md-6 col-lg-3 my-2">
      <img
        alt={`${movie.title} Poster`}
        className="rounded"
        src={movie.image_url}
        style={{ width: "100%" }}
      />
      <Link
        to={`/movies/${movie.movie_id}`}
        className="stretched-link text-dark"
      >
        <h3 className="font-poppins-heading text-center mt-2">{movie.title}</h3>
      </Link>
    </article>
  ));

  return (
    <main className="container">
      <ErrorAlert error={error} />
      <h2 className="font-poppins">Now Showing</h2>
      <hr />
      {loading ? (
        // Display loading indicator when data is being fetched
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        // Render movie list when data is loaded
        <section className="row">{list}</section>
      )}
    </main>
  );
}

export default MoviesList;

