import MovieList from "./MovieList";
import propTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const PER_PAGE = 20;

function PopularMovies({ PopularMovies }) {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * PER_PAGE;

    const currentPageData = PopularMovies
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(PopularMovies.length / PER_PAGE);

    return (
        <div className="container font-monospace mt-5">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <p className="fw-bold fs-4">Popular Movies</p>
                </div>
                <div className="row">
                    <div className="col d-flex flex-wrap justify-content-around ">
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
                </div>
            </div>
        </div>

    );
}

PopularMovies.propTypes = {
    PopularMovies: propTypes.array.isRequired
}

export default PopularMovies;