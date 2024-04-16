import propTypes from 'prop-types'
import PopularMovies from './PopularMovies'
import NowPlayingMovies from './NowPlayingMovies'
import UpcomingMovies from './UpcomingMovies'
import TopRatedMovies from './TopRatedMovies'
import { Spinner } from '../App'
import { useState, useEffect } from 'react'

function MovieTypePage({ apiKey, movieType }) {
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const actualMovieType = movieType.replace(/\s/g, '-').toLowerCase();

    useEffect(() => {
        if (actualMovieType === 'popular') {
            const fetchPopularMovies = async () => {
                const pages = Array.from({ length: 10 }, (_, i) => i + 1);
                const allPopularMovies = [];

                for (const page of pages) {
                    await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${apiKey}`)
                        .then(response => response.json())
                        .then(data => allPopularMovies.push(...data.results))
                        .catch(error => setError(error));
                }
                setPopularMovies(allPopularMovies)
                setIsLoading(false);
            }
            fetchPopularMovies();
        }
        else if (actualMovieType === 'now-playing') {
            const fetchNowPlayingMovies = async () => {
                const pages = Array.from({ length: 10 }, (_, i) => i + 1);
                const allNowPlayingMovies = [];

                for (const page of pages) {
                    await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${apiKey}`)
                        .then(response => response.json())
                        .then(data => allNowPlayingMovies.push(...data.results))
                        .catch(error => setError(error));
                }
                setNowPlayingMovies(allNowPlayingMovies)
                setIsLoading(false);
            }
            fetchNowPlayingMovies();
        }
        else if (actualMovieType === 'upcoming') {
            const fetchUpcomingMovies = async () => {
                const pages = Array.from({ length: 10 }, (_, i) => i + 1);
                const allUpcomingMovies = [];
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                for (const page of pages) {
                    await fetch(`https://api.themoviedb.org/3/movie/upcoming?page=${page}&api_key=${apiKey}`)
                        .then(response => response.json())
                        .then(data => {
                            const upcomingMovies = data.results.filter(movie => {
                                const releaseDate = new Date(movie.release_date);
                                return releaseDate >= today;
                            });
                            allUpcomingMovies.push(...upcomingMovies);
                        })
                        .catch(error => setError(error));
                }
                allUpcomingMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
                setUpcomingMovies(allUpcomingMovies)
                setIsLoading(false);
            }
            fetchUpcomingMovies();
        }
        else if (actualMovieType === 'top-rated') {
            const fetchTopRatedMovies = async () => {
                const pages = Array.from({ length: 10 }, (_, i) => i + 1);
                const allTopRatedMovies = [];

                for (const page of pages) {
                    await fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=${apiKey}`)
                        .then(response => response.json())
                        .then(data => allTopRatedMovies.push(...data.results))
                        .catch(error => setError(error));
                }
                allTopRatedMovies.sort((a, b) => b.vote_average - a.vote_average)
                setTopRatedMovies(allTopRatedMovies)
                setIsLoading(false);
            }
            fetchTopRatedMovies();
        }
        else {
            setError(`Unknown movie type: ${movieType}`);
            setIsLoading(false);
        }
    }, [actualMovieType, apiKey, movieType])

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        console.log(error)
    }

    switch (actualMovieType) {
        case 'popular':
            return <PopularMovies popularMovies={popularMovies} />;
        case 'now-playing':
            return <NowPlayingMovies nowPlayingMovies={nowPlayingMovies} />;
        case 'upcoming':
            return <UpcomingMovies upcomingMovies={upcomingMovies} />;
        case 'top-rated':
            return <TopRatedMovies topRatedMovies={topRatedMovies} />;
        default:
            return null; // Return null or some kind of 404 component when the movie type is unknown
    }
}

MovieTypePage.propTypes = {
    apiKey: propTypes.string.isRequired,
    movieType: propTypes.string.isRequired
}

export default MovieTypePage;