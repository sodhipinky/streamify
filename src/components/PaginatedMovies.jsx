import { useEffect, useState } from 'react';
import propTypes from 'prop-types'
import ReactPaginate from 'react-paginate';
import MovieList from './MovieList';

function PaginatedMovies({ apiKey }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [movies, setMovies] = useState([]);
    const pageCount = 10;

    useEffect(() => {
        fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${currentPage + 1}&api_key=${apiKey}`);
        const data = await response.json();
        setMovies(data.results);
    };

    return (
        <div className="container font-monospace mt-5">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <p className="fw-bold fs-4">All Movies</p>
                </div>
                <div className="row">
                    <div className="col d-flex flex-wrap justify-content-around">
                        <MovieList movies={movies} />
                    </div>
                </div>
                <div className="row mt-3">
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
        </div >

    );
}

PaginatedMovies.propTypes = {
    apiKey: propTypes.string.isRequired
}

export default PaginatedMovies;