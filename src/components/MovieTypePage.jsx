import propTypes from 'prop-types'
import MovieList from './MovieList'
import ReactPaginate from 'react-paginate';
import { Spinner } from '../App'
import { useState, useEffect, useMemo } from 'react'

function MovieTypePage({ apiKey, movieType }) {
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const actualMovieType = movieType.replace(/\s/g, '-').toLowerCase();

    const PER_PAGE = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * PER_PAGE;

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

    const moviesToDisplay = useMemo(() => {
        if (actualMovieType === 'popular') {
            return popularMovies;
        }
        else if (actualMovieType === 'now-playing') {
            return nowPlayingMovies;
        }
        else if (actualMovieType === 'upcoming') {
            return upcomingMovies;
        }
        else if (actualMovieType === 'top-rated') {
            return topRatedMovies;
        }
        return [];
    }, [actualMovieType, popularMovies, nowPlayingMovies, upcomingMovies, topRatedMovies]);

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        console.log(error)
    }

    const currentPageData = moviesToDisplay
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(moviesToDisplay.length / PER_PAGE);

    return (
        <div className="container-fluid font-monospace">
            <div className="row">
                <div className="col d-flex justify-content-center mb-3 p-3 text-light bg-danger ">
                    <h1 className="fw-bold">{movieType}</h1>
                </div>
            </div>
            <div className="container font-monospac">
                <div className="row">
                    <div className="col d-flex flex-wrap justify-content-around">
                        <MovieList movies={currentPageData} />
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel={<button className='btn btn-outline-success fs-5 fw-bold border-0'>←</button>}
                            nextLabel={<button className='btn btn-outline-success fs-5 fw-bold border-0'>→</button>}
                            pageCount={pageCount}
                            onPageChange={({ selected: selectedPage }) => setCurrentPage(selectedPage)}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName='bg-success text-white fs-5 fw-bold border-0'
                            pageClassName='btn btn-outline-success fs-5 fw-bold border-0'
                            breakClassName='btn btn-outline-success fs-5 fw-bold border-0'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

MovieTypePage.propTypes = {
    apiKey: propTypes.string.isRequired,
    movieType: propTypes.string.isRequired
}

export default MovieTypePage;