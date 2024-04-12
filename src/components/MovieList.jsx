import PropTypes from 'prop-types'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function MovieList({ movies }) {
    return (
        <>
            {
                movies.map((movie, index) => (
                    <div key={index} className='card movie-card m-2 font-monospace border-0 position-relative'>
                        <img src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} className='card-img-top rounded-5 shadow' alt={movie.title} />
                        <div className='card-body text-start fw-bold'>
                            <p className='card-title'>{movie.title}</p>
                        </div>
                        <div className='rating'>
                            <CircularProgressbar
                                value={Math.round(movie.vote_average * 10)}
                                text={`${Math.round(movie.vote_average * 10)}%`}
                                styles={buildStyles({
                                    textColor: "yellow",
                                    pathColor: "#60e209",
                                    trailColor: "transparent",
                                })}
                            />
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