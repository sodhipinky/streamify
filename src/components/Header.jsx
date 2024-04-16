import PropTypes from 'prop-types';
import StreamifyNavbar from "./StreamifyNavbar"
import { useEffect, useState } from "react"
import { Spinner } from "../App";

function Header({ movieTypes, genres, isLoading, apiKey }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    if (isLoading) {
        return <Spinner />;
    }

    const searchFieldWidth = windowWidth <= 992 ? 'w-25' : 'w-100';

    return (
        <>
            <div className='container-fluid m-0 p-0 w-100'>
                <StreamifyNavbar
                    searchFieldWidth={searchFieldWidth}
                    genres={genres}
                    movieTypes={movieTypes}
                    apiKey={apiKey}
                />
            </div>
        </>
    )
}

Header.propTypes = {
    movieTypes: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    apiKey: PropTypes.string.isRequired
}

export default Header