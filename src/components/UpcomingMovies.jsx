import { useState, useEffect } from 'react';
import { Spinner } from '../App';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import MovieList from './MovieList';
import ReactPaginate from 'react-paginate';

function UpcomingMovies({ apiKey }) {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const today = new Date();

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${today}&page=${currentPage + 1}&adult=false`);
            const data = await response.json();
            setUpcomingMovies(data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)));
            setTotalPages(data.total_pages)
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
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

    return (
        <div className="container-fluid font-monospace ">
            <div className="row">
                <Sticky top={81} innerZ={500} activeClass='sticky-active' className='p-0 mb-3'>
                    <div className="col d-flex justify-content-center p-3 text-light bg-danger ">
                        <h1 className="fw-bold">Upcoming Movies</h1>
                    </div>
                </Sticky>
            </div>
            <div className="container font-monospace ">
                <div className="row">
                    <div className="col d-flex flex-wrap justify-content-around ">
                        <MovieList movies={upcomingMovies} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col d-flex justify-content-center ">
                        <ReactPaginate
                            previousLabel={<button className='btn btn-outline-success fs-5 fw-bold border-0'>←</button>}
                            nextLabel={<button className='btn btn-outline-success fs-5 fw-bold border-0'>→</button>}
                            pageCount={totalPages}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                            containerClassName={'pagination'}
                            previousLinkClassName='pagination__link'
                            nextLinkClassName='pagination__link'
                            disabledClassName='pagination__link--disabled'
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

UpcomingMovies.propTypes = {
    apiKey: PropTypes.string.isRequired
}

export default UpcomingMovies;