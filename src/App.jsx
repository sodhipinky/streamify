import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import Header from './components/Header';

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollContainer = useRef(null);
  const scroll = (direction) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTo({
        left: scrollContainer.current.scrollLeft + direction * 300,
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
      <div className='container-fluid font-monospace '>
        <div className='row'>
          <div className='col d-flex justify-content-center ms-4'>
            <button className='fw-bold rounded-circle mt-5' id="scroll-left" onClick={() => scroll(-1)}>&lt;</button>
            <h3 className='mt-5 p-3 label rounded-pill'>Trending Movies</h3>
            <button className='fw-bold rounded-circle mt-5' id="scroll-right" onClick={() => scroll(1)}>&gt;</button>
          </div>
          <div className='horizontal-scroll mb-0' ref={scrollContainer}>
            <MovieList movies={trendingMovies} />
          </div>
          <div className='row'>
            <div className='col d-flex flex-wrap justify-content-start'>
              <MovieList movies={movies} />
            </div>
          </div>
        </div >
      </div>
    </>
  )
}

export default App