import PropTypes from 'prop-types';
import StreamifyNavbar from "./StreamifyNavbar"
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";
import { Spinner } from "../App";
import About from "./About";
import PopularMovies from "./PopularMovies";
import NowPlayingMovies from "./NowPlayingMovies";
import UpcomingMovies from "./UpcomingMovies";
import TopRatedMovies from "./TopRatedMovies";

function Header({ apiKey }) {
    const movieTypes = ['Popular', 'Now Playing', 'Upcoming', 'Top Rated'];
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [genres, setGenres] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
            await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    setUpcomingMovies(data.results)
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

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    if (isLoading) {
        return <Spinner />;
    }

    const searchFieldWidth = windowWidth <= 992 ? 'w-25' : 'w-100';

    return (
        <>
            <div className='container-fluid m-0 p-0 w-100'>
                <StreamifyNavbar
                    searchFieldWidth={searchFieldWidth}
                    genres={genres}
                    movieTypes={movieTypes}
                />
                <Routes>
                    <Route path='/about' element={<About />} />
                    <Route path='/popular' element={<PopularMovies popularMovies={popularMovies} />} />
                    <Route path='/now-playing' element={<NowPlayingMovies nowPlayingMovies={nowPlayingMovies} />} />
                    <Route path='/upcoming' element={<UpcomingMovies upcomingMovies={upcomingMovies} />} />
                    <Route path='/top-rated' element={<TopRatedMovies topRatedMovies={topRatedMovies} />} />
                </Routes>
            </div>
        </>
    )
}

Header.propTypes = {
    apiKey: PropTypes.string.isRequired
}

export default Header