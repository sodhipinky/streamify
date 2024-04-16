import propTypes from 'prop-types'
import PopularMovies from './PopularMovies'
import NowPlayingMovies from './NowPlayingMovies'
import UpcomingMovies from './UpcomingMovies'
import TopRatedMovies from './TopRatedMovies'

function MovieTypePage({ movieType, popularMovies, nowPlayingMovies, upcomingMovies, topRatedMovies }) {
    switch (movieType) {
        case 'Popular':
            return <PopularMovies popularMovies={popularMovies} />;
        case 'Now Playing':
            return <NowPlayingMovies nowPlayingMovies={nowPlayingMovies} />;
        case 'Upcoming':
            return <UpcomingMovies upcomingMovies={upcomingMovies} />;
        case 'Top Rated':
            return <TopRatedMovies topRatedMovies={topRatedMovies} />;
        default:
            return null; // Return null or some kind of 404 component when the movie type is unknown
    }
}

MovieTypePage.propTypes = {
    movieType: propTypes.string.isRequired,
    popularMovies: propTypes.array.isRequired,
    nowPlayingMovies: propTypes.array.isRequired,
    upcomingMovies: propTypes.array.isRequired,
    topRatedMovies: propTypes.array.isRequired
}

export default MovieTypePage;