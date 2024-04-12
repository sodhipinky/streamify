import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import Header from './components/Header';

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const topRatedScrollContainer = useRef(null);
  const trendingScrollContainer = useRef(null);

  const scroll = (direction, ref) => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + direction * 300,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    setIsLoading(true); // sets the isLoading state to true
    const fetchPages = async () => {
      const pages = Array.from({ length: 10 }, (_, i) => i + 1); // creates an array [1, 2, ..., 10]
      const allMovies = [];

      for (const page of pages) { // fetches movies from pages 1 to 10
        await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=4c0193b45b042c536215774762ee44b5`)
          .then(response => response.json())
          .then(pageData => allMovies.push(...pageData.results))
          .catch(error => setError(error));
      }
      setMovies(allMovies); // sets the movies state to allMovies
      setIsLoading(false); // sets the isLoading state to false
    };
    fetchPages(); // calls the fetchPages function
  }, []);


  useEffect(() => {
    const fetchTrendingMovies = async () => {
      await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4c0193b45b042c536215774762ee44b5')
        .then(response => response.json())
        .then(data => setTrendingMovies(data.results))
        .catch(error => setError(error));
    };
    fetchTrendingMovies();

    const fetchTopRatedMovies = async () => {
      await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=4c0193b45b042c536215774762ee44b5')
        .then(response => response.json())
        .then(data => setTopRatedMovies(data.results))
        .catch(error => setError(error));
    };
    fetchTopRatedMovies();
  });

  if (isLoading) {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col d-flex justify-content-center'>
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col d-flex justify-content-center'>
            <h1>Error: {error.message}</h1>
          </div>
        </div>
      </div>
    )
  }

  if (!movies.length) {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col d-flex justify-content-center'>
            <h1>No movies found</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className='container font-monospace '>
        <div className='row'>
          <div className='col d-flex justify-content-center ms-4'>
            <button className='fw-bold rounded-circle mt-5 scroll-left' onClick={() => scroll(-1, topRatedScrollContainer)}>&lt;</button>
            <h3 className='mt-5 p-3 label rounded-pill'>Top Rated Movies</h3>
            <button className='fw-bold rounded-circle mt-5 scroll-right' onClick={() => scroll(1, topRatedScrollContainer)}>&gt;</button>
          </div>
          <div className='horizontal-scroll mb-0' ref={topRatedScrollContainer}>
            <MovieList movies={topRatedMovies} className="movie-card" />
          </div>
        </div >
        <div className='row'>
          <div className='col d-flex justify-content-center ms-4'>
            <button className='fw-bold rounded-circle mt-5 scroll-left' onClick={() => scroll(-1, trendingScrollContainer)}>&lt;</button>
            <h3 className='mt-5 p-3 label rounded-pill'>Trending this week</h3>
            <button className='fw-bold rounded-circle mt-5 scroll-right' onClick={() => scroll(1, trendingScrollContainer)}>&gt;</button>
          </div>
          <div className='horizontal-scroll mb-0' ref={trendingScrollContainer}>
            <MovieList movies={trendingMovies} className="movie-card" />
          </div>
        </div >
      </div>
    </>
  )
}

export default App