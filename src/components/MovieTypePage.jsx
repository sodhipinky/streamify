import propTypes from 'prop-types'
import MovieList from './MovieList'
import ReactPaginate from 'react-paginate';
import Sticky from 'react-stickynode';
import { Spinner } from '../App'
import { useState, useEffect } from 'react'
import UpcomingMovies from './UpcomingMovies';

function MovieTypePage({ apiKey, movieType }) {
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const actualMovieType = movieType.replace(/\s/g, '_').toLowerCase();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
    }, [actualMovieType]);

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, actualMovieType]);

    const movieTypeToSetter = {
        'popular': setPopularMovies,
        'now_playing': setNowPlayingMovies,
        'top_rated': setTopRatedMovies,
    };

    const fetchMovies = async () => {
        if (actualMovieType === 'upcoming') {
            return;
        }
        else {
            const url = `https://api.themoviedb.org/3/movie/${actualMovieType}?api_key=${apiKey}&page=${currentPage + 1}&adult=false`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                const results = data.results;

                const setMovies = movieTypeToSetter[actualMovieType];
                if (!setMovies) {
                    throw new Error('Invalid movie type');
                }
                setMovies(results);
                setTotalPages(data.total_pages);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
    };

    if (actualMovieType === 'upcoming') {
        return <UpcomingMovies apiKey={apiKey} />
    }

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

    let currentPageData = [];
    switch (actualMovieType) {
        case 'popular':
            currentPageData = popularMovies;
            break;
        case 'now_playing':
            currentPageData = nowPlayingMovies;
            break;
        case 'top_rated':
            currentPageData = topRatedMovies;
            break;
        default:
            setError('Invalid movie type');
            return;
    }

    return (
        <div className="container-fluid font-monospace">
            <div className="row">
                <Sticky top={81} innerZ={500} activeClass='sticky-active' className='p-0 mb-3'>
                    <div className="col d-flex justify-content-center p-3 text-light bg-danger ">
                        <h1 className="fw-bold">{movieType}</h1>
                    </div>
                </Sticky>
            </div>
            <div className="container font-monospac">
                <div className="row">
                    <div className="col d-flex flex-wrap justify-content-around">
                        <MovieList movies={currentPageData} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel={<button className='btn btn-outline-success fs-5 fw-bold border-0'>←</button>}
                            nextLabel={<button className='btn btn-outline-success fs-5 fw-bold border-0'>→</button>}
                            pageCount={totalPages}
                            onPageChange={({ selected: selectedPage }) => setCurrentPage(selectedPage)}
                            forcePage={currentPage}
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