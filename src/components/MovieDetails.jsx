import PropTypes from 'prop-types';

function MovieDetails({ movie }) {
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