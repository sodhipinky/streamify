import { useEffect, useState } from 'react';
import { fetchMoviesByPage } from '../services/movieService';
import ReactPaginate from 'react-paginate';
import MovieList from './MovieList';

function PaginatedMovies() {
    const [currentPage, setCurrentPage] = useState(0);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchMoviesByPage(currentPage, setMovies, setTotalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

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
                            pageCount={totalPages}
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

export default PaginatedMovies;