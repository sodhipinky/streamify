import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSearchResults } from "../services/movieService";
import ReactPaginate from "react-paginate";
import MovieList from "./MovieList";
import Sticky from "react-stickynode";

function SearchResults() {
    const { searchTerm } = useParams();
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchTerm]);

    useEffect(() => {
        fetchSearchResults(searchTerm, currentPage, setSearchedMovies, setTotalPages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, currentPage]);

    if (searchedMovies.length === 0) {
        return (
            <div className="container-fluid font-monospace">
                <div className="row">
                    <div className="col d-flex justify-content-center mb-3 p-3 text-light bg-danger ">
                        <h1 className="fw-bold">Search Results</h1>
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-center p-3">
                            <h2>Oops! No movies found... Please rephrase your search.</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        searchedMovies.length > 0 && (
            <>
                <div className="container-fluid font-monospace ">
                    <div className="row">
                        <Sticky top={81} innerZ={500} activeClass='sticky-active' className='p-0 mb-3'>
                            <div className="col d-flex justify-content-center p-3 text-light bg-danger ">
                                <h1 className="fw-bold">Search Results</h1>
                            </div>
                        </Sticky>
                    </div>
                    <div className='container font-monospace '>
                        <div className="row">
                            <div className="col d-flex d-flex flex-wrap justify-content-around mb-3">
                                {
                                    searchedMovies.map(movie => (
                                        <MovieList key={movie.id} movies={[movie]} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-center ">
                                <ReactPaginate
                                    previousLabel={<button className='btn btn-outline-success fs-5 fw-bold border-0'>←</button>}
                                    nextLabel={<button className='btn btn-outline-success fs-5 fw-bold border-0'>→</button>}
                                    pageCount={totalPages}
                                    onPageChange={({ selected: selectedPage }) => setCurrentPage(selectedPage)}
                                    forcePage={currentPage}
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
            </>
        )
    )
}

export default SearchResults