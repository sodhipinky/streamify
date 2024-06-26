import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieReleaseDates, fetchMovieDetailsData } from '../services/movieService';

function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);
    const [certification, setCertification] = useState('Not Rated');
    const [, setMovieDetails] = useState(null);
    const [, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMovieDetails(movieId, setMovie);
        fetchMovieCredits(movieId, setMovieCredits, setIsLoading);
        fetchMovieReleaseDates(movieId, setCertification, setIsLoading);
        fetchMovieDetailsData(movieId, setMovieDetails, setIsLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId]);

    if (!movie) {
        return null;
    }

    if (!movieCredits) {
        return <p>Loading...</p>;
    }

    const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    const director = movieCredits?.crew.find(member => member.job === 'Director');
    const producer = movieCredits?.crew.find(member => member.job === 'Producer');
    const date = new Date(movie.release_date);
    let formattedDate = 'N/A';
    let year = 'N/A';
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    const budget = movie ? movie.budget : 'Loading...';
    const revenue = movie ? movie.revenue : 'Loading...';

    if (!isNaN(date.getTime())) {
        formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        year = date.getFullYear();
    }


    return (
        <div className='container-fluid bg-dark font-monospace'>
            <div className="row align-items-center justify-content-center border-0">
                <div className="col-2 m-0">
                    <div className="card bg-dark border-0">
                        <img className='card-img-top rounded-2 border-0' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </div>
                </div>
                <div className="col">
                    <div className="movie-banner" style={{ backgroundImage: `url(${imageUrl})` }}>
                        <div className="movie-banner-overlay card border-0 rounded-0 m-0">
                            <div className="movie-details card-body p-0">
                                <h1 className="card-title movie-title fw-bold mt-0">{movie.title}({year})</h1>
                                <div className="d-flex align-items-center">
                                    <p>
                                        {certification} | {formattedDate} (US) | {hours}h {minutes}m | {movie.genres.map(genre => genre.name).join(', ')}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center mt-1">
                                    <h5 className="card-text fs-5 fw-bold text-wrap me-3">Rating: </h5>
                                    <div className='detail-rating'>
                                        <CircularProgressbarWithChildren
                                            value={Math.round(movie.vote_average * 10)}
                                            styles={buildStyles({
                                                pathColor: movie.vote_average >= 7 ? "#41dc8e" : "#f8de7e",
                                                trailColor: "black",
                                            })}
                                        >
                                            <div>
                                                {Math.round(movie.vote_average * 10)}<sup>%</sup>
                                            </div>
                                        </CircularProgressbarWithChildren>
                                    </div>
                                </div>
                                <p className='card-text fs-5 fw-bold mb-0 mt-2'>Overview</p>
                                <p className="card-text fs-6">
                                    {movie.overview}
                                </p>
                                <div className="row mt-3">
                                    <div className="col">
                                        <p className="card-text fs-5 mb-0">
                                            {director ? director.name : 'Unknown'}
                                        </p>
                                        <p className='card-text fs-5 fw-bold mb-0'>Director </p>
                                    </div>
                                    <div className="col">
                                        <p className="card-text fs-5 mb-0">
                                            {producer ? producer.name : 'Unknown'}
                                        </p>
                                        <p className='card-text fs-5 fw-bold mb-0'>Producer </p>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <p className="card-text fs-5 mb-0">
                                            {budget ? `$${budget}` : 'Unknown'}
                                        </p>
                                        <p className='card-text fs-5 fw-bold mb-0'>Budget </p>
                                    </div>
                                    <div className="col">
                                        <p className="card-text fs-5 mb-0">
                                            {revenue ? `$${revenue}` : 'Unknown'}
                                        </p>
                                        <p className='card-text fs-5 fw-bold mb-0'>Revenue </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ maxWidth: '100vw' }}>
                <div className="d-flex overflow-auto">
                    {movieCredits.cast.slice(0, 10).map(actor => (
                        <div className="flex-shrink-0" key={actor.id}>
                            <div className="card h-75 p-5 bg-dark border-0 text-white movie-cast-card border-3 align-items-center text-center">
                                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} className="card-img-top w-75 rounded-5 border-0" alt={actor.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{actor.name}</h5>
                                    <p className="card-text">{actor.character}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

MovieDetails.propTypes = {
    movie: PropTypes.object,
};

export default MovieDetails;