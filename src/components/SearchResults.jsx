import { useLocation } from "react-router-dom";
import MovieList from "./MovieList";

function SearchResults() {
    const location = useLocation();
    const searchedMovies = location.state.searchedMovies;

    if(searchedMovies.length === 0) {
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
                        <div className="col d-flex justify-content-center mb-3 p-3 text-light bg-danger ">
                            <h1 className="fw-bold">Search Results</h1>
                        </div>
                    </div>
                </div>
                <div className='container font-monospace '>
                    <div className="row">
                        <div className="col d-flex d-flex flex-wrap justify-content-around">
                            {
                                searchedMovies.map(movie => (
                                    <MovieList key={movie.id} movies={[movie]} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default SearchResults