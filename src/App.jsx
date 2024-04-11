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

      for (const page of pages) { // fetches movies from pages 1 to 10
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=4c0193b45b042c536215774762ee44b5`);
        const data = await response.json(); // parses JSON data from the response
        allMovies.push(...data.results); // appends the movies from the current page to the allMovies array
      }

      setMovies(allMovies); // sets the movies state to the allMovies array
    };
    fetchPages(); // calls the fetchPages function
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