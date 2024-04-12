import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MovieDetails() {
    const {movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4c0193b45b042c536215774762ee44b5`)
                .then(response => response.json())
                .then(data => setMovie(data))
                .catch(error => console.error(error));
        }
        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return null;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            {/* ...rest of your movie details */}
        </div>
    );
}

MovieDetails.propTypes = {
    movie: PropTypes.object,
};

export default MovieDetails;