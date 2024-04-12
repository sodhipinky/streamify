import PropTypes from 'prop-types'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function MovieList({ movies }) {
    return (
        <>
            {
                movies.map((movie, index) => {
                    const date = new Date(movie.release_date);
                    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
                    return (
                        <div key={index} className='card movie-card m-2 font-monospace border-0 position-relative'>
                            <img src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} className='card-img-top rounded-5 shadow' alt={movie.title} />
                            <div className='card-body text-start'>
                                <p className='card-title fw-bold mb-0'>{movie.title}</p>
                                <small className='card-text'>{formattedDate}</small>
                            </div>
                            <div className='rating'>
                                <CircularProgressbar
                                    value={Math.round(movie.vote_average * 10)}
                                    text={`${Math.round(movie.vote_average * 10)}%`}
                                    styles={buildStyles({
                                        textColor: "yellow",
                                        pathColor: "yellow",
                                        trailColor: "black",
                                        textSize: "28px"
                                    })}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired
}

export default MovieList