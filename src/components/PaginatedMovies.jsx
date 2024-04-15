import { useState } from 'react';
import propTypes from 'prop-types'
import ReactPaginate from 'react-paginate';
import MovieList from './MovieList';

const PER_PAGE = 20;

function PaginatedMovies({ movies }) {
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * PER_PAGE;

    const currentPageData = movies
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(movies.length / PER_PAGE);

    return (
        <div className='d-flex flex-wrap justify-content-around '>
            <MovieList movies={currentPageData} />

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
    );
}

PaginatedMovies.propTypes = {
    movies: propTypes.array.isRequired
}

export default PaginatedMovies;