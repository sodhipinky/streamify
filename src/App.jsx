import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=4c0193b45b042c536215774762ee44b5').then((res) => res.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=2&api_key=4c0193b45b042c536215774762ee44b5').then((res) => res.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=3&api_key=4c0193b45b042c536215774762ee44b5').then((res) => res.json()),
      fetch('https://api.themoviedb.org/3/discover/movie?page=4&api_key=4c0193b45b042c536215774762ee44b5').then((res) => res.json()),
    ])
      .then(([data1, data2, data3, data4]) => {
        setMovies([...data1.results, ...data2.results, ...data3.results, ...data4.results]);
      });
  })

  return (
    <div className='container-fluid movie-app'>
      {/* <div className='row'> */}
      <div className='col d-flex flex-wrap  justify-content-start'>
        <MovieList movies={movies} />
      </div>
      {/* </div> */}
    </div >
  );
}

export default App