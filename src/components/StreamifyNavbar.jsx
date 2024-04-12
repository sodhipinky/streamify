import Logo from '../assets/favicon.ico'
import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap'
import propTypes from 'prop-types'

function StreamifyNavbar({ searchFieldWidth, genres }) {

    return (
        <Navbar fixed='top' collapseOnSelect bg="dark" variant='dark' expand="lg" className='font-monospace p-0'>
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