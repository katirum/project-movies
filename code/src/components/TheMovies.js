/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/themovies.css'
import RotatingPoo from './RotatingPoo';
import { PooTimer } from './util';

const TheMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Shows the poo spinner for 3 seconds
    PooTimer(setLoading)

    fetchMovies();
  }, []);

  const fetchMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=02c269c6419024906430a5cca2edf53f&language=en-US&page=1')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error))
  }

  // during loading, a component containing animated poo emoji will show up
  if (loading) {
    return <RotatingPoo />
  }

  return (
    <main className="main-page">
      {movies.results.map((movie) => {
        return (
          <Link className="image-container" key={movie.id} to={`/movies/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="movie poster" />

            <div className="overlay-detail">
              <h1>{movie.title}</h1>
              <p>Released {movie.release_date}</p>
            </div>
          </Link>
        )
      })}
    </main>
  )
}

export default TheMovies;