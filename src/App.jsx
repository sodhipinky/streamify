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

export function Spinner() {
  return <div className="spinner"></div>;
}

function App() {

  const movieTypes = ['Popular', 'Now Playing', 'Upcoming', 'Top Rated'];

  const [movies, setMovies] = useState([]);
  const [trendingMoviesThisWeek, setTrendingMoviesThisWeek] = useState([]);
  const [trendingMoviesToday, setTrendingMoviesToday] = useState([]);
  const [trendingTimePeriod, setTrendingTimePeriod] = useState('day');
  const [genres, setGenres] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
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
    setIsLoading(true); // sets the isLoading state to true
    const fetchPages = async () => {
      const pages = Array.from({ length: 10 }, (_, i) => i + 1); // creates an array [1, 2, ..., 10]
      const allMovies = [];

      for (const page of pages) { // fetches movies from pages 1 to 10
        await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${apiKey}`)
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
      await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => setTrendingMoviesThisWeek(data.results))
        .catch(error => setError(error));
    };
    fetchTrendingMoviesThisWeek();

    const fetchTrendingMoviesToday = async () => {
      await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
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

    const fetchPopularMovies = async () => {
      await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setPopularMovies(data.results)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error)
          setIsLoading(false)
        });
    }
    fetchPopularMovies();

    const fetchNowPlayingMovies = async () => {
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setNowPlayingMovies(data.results)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error)
          setIsLoading(false)
        });
    }
    fetchNowPlayingMovies();

    const fetchUpcomingMovies = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          const upcoming = data.results.filter(movie => {
            const releaseDate = new Date(movie.release_date);
            releaseDate.setHours(0, 0, 0, 0);
            return releaseDate >= today;
          })
          setUpcomingMovies(upcoming)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error)
          setIsLoading(false)
        });
    }
    fetchUpcomingMovies();

    const fetchTopRatedMovies = async () => {
      await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setTopRatedMovies(data.results)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error)
          setIsLoading(false)
        });
    }
    fetchTopRatedMovies();
  });

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

  if (!movies.length) {
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
      <Header
        movieTypes={movieTypes}
        genres={genres}
        popularMovies={popularMovies}
        nowPlayingMovies={nowPlayingMovies}
        upcomingMovies={upcomingMovies}
        topRatedMovies={topRatedMovies}
        isLoading={isLoading}
      />
      <Routes>
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
            <PaginatedMovies movies={movies} />
          </>
        } />
        <Route path='/movie-details/:movieId' element={<MovieDetails />} />
        <Route path='/about' element={<About />} />
        {
          movieTypes.map((movieType, index) => (
            <Route
              key={index}
              path={`/${movieType.replace(/\s/g, '-').toLowerCase()}`}
              element={
                <MovieTypePage
                  movieType={movieType}
                  popularMovies={popularMovies}
                  nowPlayingMovies={nowPlayingMovies}
                  upcomingMovies={upcomingMovies}
                  topRatedMovies={topRatedMovies}
                />
              }
            />
          ))
        }
      </Routes>
    </Router >
  )
}

export default App