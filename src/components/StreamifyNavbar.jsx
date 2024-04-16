import Logo from '../assets/favicon.ico'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { InputGroup, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import propTypes from 'prop-types'

function StreamifyNavbar({ searchFieldWidth, genres, movieTypes }) {

    return (
        <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg" className='font-monospace pb-2'>
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
                                        to={`/${movieType.replace(/\s/g, '-').toLowerCase()}`}>
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
                                placeholder="Search"
                                className={`ms-4 fs-5 rounded-pill border-1 pe-5 ${searchFieldWidth}`}
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
    )
}

StreamifyNavbar.propTypes = {
    searchFieldWidth: propTypes.string.isRequired,
    genres: propTypes.array.isRequired,
    movieTypes: propTypes.array.isRequired
}


export default StreamifyNavbar