import PropTypes from 'prop-types';
function MovieList({ movies }) {
    return (
        <>
            {
                movies.map((movie, index) => (
                    <div key={index} className='card movie-card m-2'>
                        <img src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} className='card-img-top' alt={movie.original_title} />
                        <div className='card-body'>
                            <h5 className='card-title'>{movie.original_title}</h5>
                            <p className='card-text text-secondary'>{movie.overview}</p>
                        </div>
                        <div className='card-footer'>
                            <small className='fw-bold text-success'>Rating: {movie.vote_average | Number}/10</small>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired
}

export default MovieList