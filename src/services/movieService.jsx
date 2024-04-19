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

export async function fetchMoviesByGenre(genreId, selectedGenre, currentPage, setMovies, setTotalPages) {
    if (!selectedGenre) {
        return;
    }
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genreId}&page=${currentPage + 1}&adult=false`);
    const data = await response.json();
    setMovies(data.results);
    setTotalPages(data.total_pages);
}

export async function fetchMovieDetails(movieId, setMovie) {
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(data => setMovie(data))
        .catch(error => console.error(error));
}

export async function fetchMovieCredits(movieId, setMovieCredits, setIsLoading) {
    setIsLoading(true);
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            setMovieCredits(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error)
            setIsLoading(false);
        });
}

export async function fetchMovieReleaseDates(movieId, setCertification, setIsLoading) {
    setIsLoading(true);
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const usReleaseDates = data.results.find(result => result.iso_3166_1 === 'US');
            setCertification(usReleaseDates ? usReleaseDates.release_dates[0].certification : 'N/A');
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error)
            setIsLoading(false);
        });
}

export async function fetchMovieDetailsData(movieId, setMovieDetails, setIsLoading) {
    setIsLoading(true);
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4c0193b45b042c536215774762ee44b5`)
        .then(response => response.json())
        .then(data => {
            setMovieDetails(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error)
            setIsLoading(false);
        });
}

export async function fetchMoviesByType(actualMovieType, currentPage, setTotalPages, setIsLoading, setError, movieTypeToSetter) {

    if (actualMovieType === 'upcoming') {
        return;
    }
    else {
        const url = `https://api.themoviedb.org/3/movie/${actualMovieType}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${currentPage + 1}&adult=false`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const results = data.results;

            const setMovies = movieTypeToSetter[actualMovieType];
            if (!setMovies) {
                throw new Error('Invalid movie type');
            }
            setMovies(results);
            setTotalPages(data.total_pages);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }
}

export async function fetchMoviesByPage(currentPage, setMovies, setTotalPages) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${currentPage + 1}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    const data = await response.json();
    setMovies(data.results);
    setTotalPages(data.total_pages);
}

export async function fetchSearchResults(searchTerm, currentPage, setSearchedMovies, setTotalPages) {
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchTerm}&page=${currentPage + 1}`)
        .then(response => response.json())
        .then(data => {
            setSearchedMovies(data.results);
            setTotalPages(data.total_pages);
        })
        .catch(error => console.error(error));
}

export async function fetchUpcomingMovies(currentPage, setUpcomingMovies, setIsLoading, setTotalPages, setError, today) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&primary_release_date.gte=${today}&page=${currentPage + 1}&adult=false`);
    if (!response.ok) {
        setError(new Error(`HTTP error! status: ${response.status}`));
    }
    const data = await response.json();
    setUpcomingMovies(data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)));
    setTotalPages(data.total_pages);
    setIsLoading(false);
}