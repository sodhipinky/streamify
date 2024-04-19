import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchTrendingMovies, fetchGenres } from './services/movieService';
import PaginatedMovies from './components/PaginatedMovies';
import TrendingMovies from './components/TrendingMovies';
import Header from './components/Header';
import MovieDetails from './components/MovieDetails';
import MovieTypePage from './components/MovieTypePage';
import About from './components/About';
import MovieDisplayByGenre from './components/MovieDisplayByGenre';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
    const fetchData = async () => {
      try {
        const [weekMovies, todayMovies, genres] = await Promise.all([
          fetchTrendingMovies('week'),
          fetchTrendingMovies('day'),
          fetchGenres()
        ]);
        setTrendingMoviesThisWeek(weekMovies);
        setTrendingMoviesToday(todayMovies);
        setGenres(genres);
      }
      catch (error) {
        setError(error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
          <Route path='/search-results/:searchTerm' element={<SearchResults />} />
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
              <PaginatedMovies />
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
              <PaginatedMovies />
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
                    movieType={movieType}
                  />
                }
              />
            ))
          }
          <Route path='/genre/:genreId' element={
            <MovieDisplayByGenre
              genres={genres}
            />
          } />
        </Routes>
        <Footer />
      </div>
    </Router >
  )
}

export default App