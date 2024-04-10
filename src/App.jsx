import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=2&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=3&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=4&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=5&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=6&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=7&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=8&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=9&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=10&api_key=4c0193b45b042c536215774762ee44b5').then((response) => response.json()),
    ])
      .then((
        [
          page1,
          page2,
          page3,
          page4,
          page5,
          page6,
          page7,
          page8,
          page9,
          page10
        ]) => {
        setMovies([
          ...page1.results,
          ...page2.results,
          ...page3.results,
          ...page4.results,
          ...page5.results,
          ...page6.results,
          ...page7.results,
          ...page8.results,
          ...page9.results,
          ...page10.results
        ]);
      });
  })

  return (
    <div className='container-fluid movie-app'>
      <div className='row'>
        <div className='col d-flex flex-wrap justify-content-center'>
          <MovieList movies={movies} />
        </div>
      </div>
    </div >
  );
}

export default App