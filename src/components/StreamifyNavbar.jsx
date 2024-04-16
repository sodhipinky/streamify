import Logo from '../assets/favicon.ico'
import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

function StreamifyNavbar({ searchFieldWidth, genres, movieTypes }) {

    return (
        <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg" className='font-monospace pb-2'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img src={Logo} alt={"Streamify"} width={55} className="d-inline-block me-2" />
                    Streamify
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
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
                                        eventKey={genre.id}
                                        className='small-font drop-item-custom'
                                        as={Link}
                                        to={`/genre/${genre.id}`}
                                    >
                                        {genre.name}
                                    </NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex justify-content-center">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className={`ms-2 me-2 rounded-pill border-0 ${searchFieldWidth}`}
                            aria-label="Search"
                        />
                    </Form>
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