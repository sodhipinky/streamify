// import Navbar from './Navbar'
import StreamifyNavbar from "./StreamifyNavbar"
import { useEffect, useState } from "react"

function Header() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4c0193b45b042c536215774762ee44b5')
                .then(response => response.json())
                .then(data => setGenres(data.genres))
                .catch(error => console.error(error));
        }
        fetchGenres();
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const searchFieldWidth = windowWidth <= 992 ? 'w-25' : 'w-100';

    return (
        <>
            <div className='container-fluid m-0 p-0 w-100'>
                <StreamifyNavbar
                    searchFieldWidth={searchFieldWidth}
                    genres={genres}
                />
            </div>
        </>
    )
}

export default Header