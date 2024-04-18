import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { InputGroup, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useState } from 'react';
import Logo from '../assets/favicon.ico'
import propTypes from 'prop-types';

function StreamifyNavbar({ searchFieldWidth, genres, movieTypes, apiKey }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            if (searchTerm.trim() === '') {
                return;
            }
            await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    navigate('/search-results', { state: { searchedMovies: data.results } });
                    setSearchTerm('');
                })
                .catch(error => console.log(error));
        }
    }


    return (
        <>
            <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg" className='font-monospace pb-2 sticky-nav'>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/home">
                        <img src={Logo} alt={"Streamify"} width={55} className="d-inline-block me-2" />
                        Streamify
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto fs-5">
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <NavDropdown title='Movies' id="basic-nav-dropdown" className="align-content-center">
                                {
                                    movieTypes.map((movieType, index) => (
                                        <NavDropdown.Item
                                            key={index}
                                            className='small-font dropdown-item-custom'
                                            as={Link}
                                            to={`/${movieType.replace(/\s/g, '_').toLowerCase()}`}>
                                            {movieType}
                                        </NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                            <NavDropdown title='Genre' id="basic-nav-dropdown" className="align-content-center">
                                {
                                    genres.map((genre, index) => (
                                        <NavDropdown.Item
                                            key={index}
                                            className='small-font dropdown-item-custom'
                                            as={Link}
                                            to={`/genre/${genre.id}`}
                                        >
                                            {genre.name}
                                        </NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                        </Nav>
                        <InputGroup>
                            <div className="position-relative w-100 me-5">
                                <FormControl
                                    type="search"
                                    placeholder="Search any movie by name..."
                                    className={`ms-4 fs-5 rounded-pill border-1 pe-5 ${searchFieldWidth}`}
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    aria-label="Search"
                                />
                                <InputGroup.Text className="border-0 bg-transparent rounded-end-pill position-absolute top-50 translate-middle-y end-0">
                                    <Search />
                                </InputGroup.Text>
                            </div>
                        </InputGroup>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

StreamifyNavbar.propTypes = {
    searchFieldWidth: propTypes.string.isRequired,
    genres: propTypes.array.isRequired,
    movieTypes: propTypes.array.isRequired,
    apiKey: propTypes.string.isRequired
}


export default StreamifyNavbar