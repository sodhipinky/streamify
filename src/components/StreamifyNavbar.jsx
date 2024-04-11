import Logo from '../assets/favicon.ico'
import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function StreamifyNavbar() {
    const [dropdownTitle, ssetDropdownTitle] = useState('All Movies');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleClick = (eventKey, event) => {
        // set the selected optio as the title of the dropdown
        event.preventDefault();
        const selectedOption = event.target.innerText;
        ssetDropdownTitle(selectedOption);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const searchFieldWidth = windowWidth <= 992 ? 'w-25' : 'w-50';

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className='mb-5 font-monospace'>
            <Container fluid>
                <Navbar.Brand href="#home">
                    <img src={Logo} alt={"Streamify"} width={55} className="d-inline-block me-2" />
                    Streamify
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='text-light' href="#home">Home</Nav.Link>
                        <Nav.Link className='text-light' href="#link">About</Nav.Link>
                    </Nav>
                    <Form className="d-flex justify-content-center">
                        <NavDropdown title={dropdownTitle} id="basic-nav-dropdown" onSelect={handleClick} className="text-light align-content-center ">
                            <NavDropdown.Item eventKey={0} href="#">All Movies</NavDropdown.Item>
                            <NavDropdown.Item eventKey={1} href="#">Title</NavDropdown.Item>
                            <NavDropdown.Item eventKey={2} href="#">Genre</NavDropdown.Item>
                            <NavDropdown.Item eventKey={3} href="#">Rating</NavDropdown.Item>
                        </NavDropdown>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className={`ms-2 me-2 rounded-pill border-0 ${searchFieldWidth} small-font`}
                            aria-label="Search"
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default StreamifyNavbar