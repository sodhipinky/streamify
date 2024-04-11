import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const pages = Array.from({ length: 10 }, (_, i) => i + 1); // creates an array [1, 2, ..., 10]
      const allMovies = [];

      for (const page of pages) {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=4c0193b45b042c536215774762ee44b5`);
        const data = await response.json();
        allMovies.push(...data.results);
      }

      setMovies(allMovies);
    };
    fetchPages();
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col d-flex flex-wrap justify-content-center'>
          <MovieList movies={movies} />
        </div>
      </div>
    </div >
  );
}

export default App