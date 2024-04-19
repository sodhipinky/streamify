import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginatedMovies from './components/PaginatedMovies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TrendingMovies from './components/TrendingMovies';
import Header from './components/Header';
import MovieDetails from './components/MovieDetails';
import MovieTypePage from './components/MovieTypePage';
import About from './components/About';
import MovieDisplayByGenre from './components/MovieDisplayByGenre';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';

export function Spinner() {
  return <div className="spinner"></div>;
}

function App() {

  const movieTypes = ['Popular', 'Now Playing', 'Upcoming', 'Top Rated'];

  const [trendingMoviesThisWeek, setTrendingMoviesThisWeek] = useState([]);
  const [trendingMoviesToday, setTrendingMoviesToday] = useState([]);
  const [trendingTimePeriod, setTrendingTimePeriod] = useState('day');
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = '4c0193b45b042c536215774762ee44b5';

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
    const fetchTrendingMoviesThisWeek = async () => {
      await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=1`)
        .then(response => response.json())
        .then(data => setTrendingMoviesThisWeek(data.results))
        .catch(error => setError(error));
    };
    fetchTrendingMoviesThisWeek();

    const fetchTrendingMoviesToday = async () => {
      await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=1`)
        .then(response => response.json())
        .then(data => setTrendingMoviesToday(data.results))
        .catch(error => setError(error));
    };
    fetchTrendingMoviesToday();

    const fetchGenres = async () => {
      await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setGenres(data.genres)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error)
          setIsLoading(false)
        });
    }
    fetchGenres();
  }, []);

  if (isLoading) {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col d-flex justify-content-center'>
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

  if (!trendingMoviesThisWeek.length || !trendingMoviesToday.length) {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col d-flex justify-content-center'>
            <Spinner />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <Header
          movieTypes={movieTypes}
          genres={genres}
          isLoading={isLoading}
        />
        <Routes>
          <Route path='/search-results/:searchTerm' element={<SearchResults apiKey={apiKey} />} />
          <Route path='/' element={
            <>
              <TrendingMovies
                trendingTimePeriod={trendingTimePeriod}
                setTrendingTimePeriod={setTrendingTimePeriod}
                trendingMoviesToday={trendingMoviesToday}
                trendingMoviesThisWeek={trendingMoviesThisWeek}
                scroll={scroll}
                trendingScrollContainer={trendingScrollContainer}
              />
              <PaginatedMovies apiKey={apiKey} />
            </>
          }
          />
          <Route path='/home' element={
            <>
              <TrendingMovies
                trendingTimePeriod={trendingTimePeriod}
                setTrendingTimePeriod={setTrendingTimePeriod}
                trendingMoviesToday={trendingMoviesToday}
                trendingMoviesThisWeek={trendingMoviesThisWeek}
                scroll={scroll}
                trendingScrollContainer={trendingScrollContainer}
              />
              <PaginatedMovies apiKey={apiKey} />
            </>
          } />
          <Route path='/movie-details/:movieId' element={<MovieDetails />} />
          <Route path='/about' element={<About />} />
          {
            movieTypes.map((movieType, index) => (
              <Route
                key={index}
                path={`/${movieType.replace(/\s/g, '_').toLowerCase()}`}
                element={
                  <MovieTypePage
                    apiKey={apiKey}
                    movieType={movieType}
                  />
                }
              />
            ))
          }
          <Route path='/genre/:genreId' element={
            <MovieDisplayByGenre
              genres={genres}
              apiKey={apiKey}
            />
          } />
        </Routes>
        <Footer />
      </div>
    </Router >
  )
}

export default App