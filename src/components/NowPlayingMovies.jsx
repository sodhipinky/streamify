import { useState } from 'react';
import propTypes from 'prop-types'
import ReactPaginate from 'react-paginate';
import MovieList from './MovieList';

const PER_PAGE = 20;

function NowPlayingMovies({ nowPlayingMovies }) {
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * PER_PAGE;

    const currentPageData = nowPlayingMovies
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(nowPlayingMovies.length / PER_PAGE);

    return (
        <div className="container font-monospace mt-5">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <p className="fw-bold fs-4">Now Playing</p>
                </div>
                <div className="row">
                    <div className="col d-flex flex-wrap justify-content-around ">
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

NowPlayingMovies.propTypes = {
    nowPlayingMovies: propTypes.array.isRequired
}

export default NowPlayingMovies;