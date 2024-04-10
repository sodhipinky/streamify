import PropTypes from 'prop-types';
function MovieList({ movies }) {
    return (
        <>
            {
                movies.map((movie, index) => (
                    <div key={index} className='card movie-card m-2 font-monospace bg-success-subtle rounded-5'>
                        <img src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} className='card-img-top rounded-5' alt={movie.title} />
                        <div className='card-body'>
                            <h5 className='card-title fw-bold text-success-emphasis text-decoration-underline'>{movie.title}</h5>
                        </div>
                        <div className='card-footer bg-success-subtle'>
                            <small className='fw-bold fs-6 text-success-emphasis'>Rating: {movie.vote_average | Number}</small>
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