import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types'
import ReactPaginate from 'react-paginate';
import MovieList from './MovieList';

const PER_PAGE = 20;

function MovieDisplayByGenre({ movies, genres }) {
    const { genreId } = useParams();
    const selectedGenre = genres.find(genre => genre.id === parseInt(genreId));

    const filteredMovies = useMemo(() => {
        if (!selectedGenre) {
            return movies;
        }
        return movies.filter(movie => movie.genre_ids.includes(selectedGenre.id));
    }, [movies, selectedGenre]);

    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * PER_PAGE;

    const currentPageData = filteredMovies
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(filteredMovies.length / PER_PAGE);

    return (
        <div className="container-fluid font-monospace">
            <div className="row">
                <div className="col d-flex justify-content-center mb-3 p-3 text-light bg-danger ">
                    <h1 className="fw-bold">{selectedGenre.name}</h1>
                </div>
            </div>
            <div className="container font-monospace">
                <div className="row">
                    <div className="col d-flex flex-wrap justify-content-around">
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

MovieDisplayByGenre.propTypes = {
    movies: propTypes.array.isRequired,
    genres: propTypes.array.isRequired
}

export default MovieDisplayByGenre;