import Logo from '../assets/favicon.ico'
import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap'
import propTypes from 'prop-types'

function StreamifyNavbar({ searchFieldWidth, genres }) {

    return (
        <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg" className='mb-5 font-monospace'>
            <Container fluid>
                <Navbar.Brand href="#home">
                    <img src={Logo} alt={"Streamify"} width={55} className="d-inline-block me-2" />
                    Streamify
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">About</Nav.Link>
                        <NavDropdown title='Movie Lists' id="basic-nav-dropdown" className="align-content-center">
                            <NavDropdown.Item eventKey={1} defaultValue={"popular"} className='small-font' href="#">Popular</NavDropdown.Item>
                            <NavDropdown.Item eventKey={2} defaultValue={"top_rated"} className='small-font' href="#">Top Rated</NavDropdown.Item>
                            <NavDropdown.Item eventKey={3} defaultValue={"now_playing"} className='small-font' href="#">Now Playing</NavDropdown.Item>
                            <NavDropdown.Item eventKey={4} defaultValue={"upcoming"} className='small-font' href="#">Upcoming</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title='Genre' id="basic-nav-dropdown" className="align-content-center">
                            {
                                genres.map((genre, index) => (
                                    <NavDropdown.Item key={index} eventKey={genre.id} className='small-font' href="#">{genre.name}</NavDropdown.Item>
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
    genres: propTypes.array.isRequired
}


export default StreamifyNavbar