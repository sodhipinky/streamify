import PropTypes from 'prop-types';
function MovieList({ movies }) {
    return (
        <>
            {
                movies.map((movie, index) => (
                    <div key={index} className="image-container m-3">
                        <img src={movie.poster_path} alt={movie.original_title} height={200} />
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