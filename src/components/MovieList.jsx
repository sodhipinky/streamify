import PropTypes from 'prop-types'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function MovieList({ movies, onMovieClick }) {
    return (
        <>
            {
                movies.map((movie, index) => {
                    const date = new Date(movie.release_date);
                    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    return (
                        <div key={index} className='card movie-card font-monospace border-0 position-relative' onClick={() => onMovieClick(movie)}>
                            <img src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} className='card-img-top rounded-5 shadow' alt={movie.title} />
                            <div className='card-body text-start'>
                                <p className='card-title fw-bold mb-0'>{movie.title}</p>
                                <small className='card-text'>{formattedDate}</small>
                            </div>
                            <div className='rating'>
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
                    )
                })
            }
        </>
    )
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
    onMovieClick: PropTypes.func.isRequired
}

export default MovieList