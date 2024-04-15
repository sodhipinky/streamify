import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import Header from './components/Header';
import MovieDetails from './components/MovieDetails';

function Spinner() {
  return <div className="spinner"></div>;
}

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMoviesThisWeek, setTrendingMoviesThisWeek] = useState([]);
  const [trendingMoviesToday, setTrendingMoviesToday] = useState([]);
  const [, setTopRatedMovies] = useState([]);
  const [trendingTimePeriod, setTrendingTimePeriod] = useState('day');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const topRatedScrollContainer = useRef(null);
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
    const fetchTrendingMoviesThisWeek = async () => {
      await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4c0193b45b042c536215774762ee44b5')
        .then(response => response.json())
        .then(data => setTrendingMoviesThisWeek(data.results))
        .catch(error => setError(error));
    };
    fetchTrendingMoviesThisWeek();

    const fetchTrendingMoviesToday = async () => {
      await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=4c0193b45b042c536215774762ee44b5')
        .then(response => response.json())
        .then(data => setTrendingMoviesToday(data.results))
        .catch(error => setError(error));
    };
    fetchTrendingMoviesToday();

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
            {/* <h1>Loading...</h1> */}
            <Spinner />
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
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={
          <>
            <div className='container font-monospace mt-5'>
              <div className='row'>
                <div className='col d-flex justify-content-center align-items-center mt-5 ms-3'>
                  <button className='fw-bold rounded-circle scroll-left' onClick={() => scroll(-1, trendingScrollContainer)}>&lt;</button>
                  <p className='d-inline-block fs-4 fw-bold mb-0'>Trending</p>
                  <div className='col-md-4 d-flex justify-content-evenly ms-3 align-items-center'>
                    <button className={`btn ${trendingTimePeriod === 'day' ? 'btn-danger' : 'btn-secondary'} rounded-pill me-1 p-1 w-50`} onClick={() => setTrendingTimePeriod('day')}>Today</button>
                    <button className={`btn ${trendingTimePeriod === 'week' ? 'btn-danger' : 'btn-secondary'} rounded-pill me-1 p-1 w-50`} onClick={() => setTrendingTimePeriod('week')}>This Week</button>
                  </div>
                  <button className='fw-bold rounded-circle scroll-right' onClick={() => scroll(1, trendingScrollContainer)}>&gt;</button>
                </div>
                <div className='horizontal-scroll mb-0' ref={trendingScrollContainer}>
                  <MovieList movies={trendingTimePeriod === 'day' ? trendingMoviesToday : trendingMoviesThisWeek} className="movie-card" />
                </div >
              </div>
            </div>
          </>
        } />
        <Route path='/movie-details/:movieId' element={<MovieDetails />} />
      </Routes>
    </Router >
  )
}

export default App