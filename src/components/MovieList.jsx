import PropTypes from 'prop-types'
import MovieCard from './MovieCard'

function MovieList({ movies }) {
    return (
        <>
            {
                movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))
            }
        </>
    )
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired
}

export default MovieList