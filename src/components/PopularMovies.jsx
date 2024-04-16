import MovieList from "./MovieList";
import propTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const PER_PAGE = 20;

function PopularMovies({ popularMovies }) {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * PER_PAGE;

    const currentPageData = popularMovies
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(popularMovies.length / PER_PAGE);

    return (
        <div className="container-fluid font-monospace">
            <div className="row">
                <div className="col d-flex justify-content-center mb-3 p-3 text-light bg-danger ">
                    <h1 className="fw-bold">Popular</h1>
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

PopularMovies.propTypes = {
    popularMovies: propTypes.array.isRequired
}

export default PopularMovies;