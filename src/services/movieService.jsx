export async function fetchTrendingMovies(timePeriod) {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/${timePeriod}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
}

export async function fetchGenres() {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.genres;
}