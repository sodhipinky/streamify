import MovieList from './MovieList';
import propTypes from 'prop-types';

function TrendingMovies({ trendingTimePeriod, setTrendingTimePeriod, trendingMoviesToday, trendingMoviesThisWeek, scroll, trendingScrollContainer }) {
    return (
        <div className='container font-monospace'>
            <div className='row'>
                <div className='col d-flex justify-content-center align-items-center mt-5 ms-3'>
                    <button className='fw-bold rounded-circle scroll-left' onClick={() => scroll(-1, trendingScrollContainer)}>&lt;</button>
                    <p className='d-inline-block fs-4 fw-bold mb-0'>Trending</p>
                    <div className='col-md-4 d-flex justify-content-evenly ms-3 align-items-center'>
                        <button className={`btn ${trendingTimePeriod === 'day' ? 'btn-danger' : 'btn-secondary'} rounded-pill me-1 p-1 w-50`} onClick={() => setTrendingTimePeriod('day')}>Today</button>
                        <button className={`btn ${trendingTimePeriod === 'week' ? 'btn-danger' : 'btn-secondary'} rounded-pill me-1 p-1 w-50`} onClick={() => setTrendingTimePeriod('week')}>This Week</button>
                    </div>
                    <button className='fw-bold rounded-circle scroll-right' onClick={() => scroll(1, trendingScrollContainer)}>&gt;</button>
                </div>
                <div className='horizontal-scroll mb-0' ref={trendingScrollContainer}>
                    <MovieList movies={trendingTimePeriod === 'day' ? trendingMoviesToday : trendingMoviesThisWeek} className="movie-card" />
                </div >
            </div>
        </div>
    );
}

TrendingMovies.propTypes = {
    trendingTimePeriod: propTypes.string.isRequired,
    setTrendingTimePeriod: propTypes.func.isRequired,
    trendingMoviesToday: propTypes.array.isRequired,
    trendingMoviesThisWeek: propTypes.array.isRequired,
    scroll: propTypes.func.isRequired,
    trendingScrollContainer: propTypes.object.isRequired
}

export default TrendingMovies;