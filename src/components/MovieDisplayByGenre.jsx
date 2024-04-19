import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types'
import ReactPaginate from 'react-paginate';
import MovieList from './MovieList';
import Sticky from 'react-stickynode';

function MovieDisplayByGenre({ genres }) {
    const { genreId } = useParams();
    const selectedGenre = genres.find(genre => genre.id === parseInt(genreId));
    const [currentPage, setCurrentPage] = useState(0);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
    }, [genreId]);

    useEffect(() => {
        fetchMoviesByGenre();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreId, currentPage]);


    const fetchMoviesByGenre = async () => {
        if (!selectedGenre) {
            return;
        }
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genreId}&page=${currentPage + 1}&adult=false`);
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
    };


    if (movies.length === 0) {
        return (
            <div className="container-fluid font-monospace">
                <div className="row">
                    <div id='genre-title' className="col d-flex justify-content-center mb-3 p-3 text-light bg-danger">
                        <h1 className="fw-bold">{selectedGenre.name}</h1>
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-center p-3">
                            <h2>Oops! No movies here yet...</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container-fluid font-monospace">
            <div className="row">
                <Sticky top={81} innerZ={500} activeClass='sticky-active' className='p-0 mb-3'>
                    <div className="col d-flex justify-content-center p-3 text-light bg-danger ">
                        <h1 className="fw-bold">{selectedGenre.name}</h1>
                    </div>
                </Sticky>
            </div>
            <div className="container font-monospace">
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

MovieDisplayByGenre.propTypes = {
    genres: propTypes.array.isRequired,
}

export default MovieDisplayByGenre;