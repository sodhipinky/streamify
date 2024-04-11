import Logo from '../assets/favicon.ico'
import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap'
import { useState } from 'react'

function StreamifyNavbar() {
    const [dropdownTitle, ssetDropdownTitle] = useState('All Movies')

    const handleClick = (eventKey, event) => {
        // set the selected optio as the title of the dropdown
        event.preventDefault();
       const selectedOption = event.target.innerText;
         ssetDropdownTitle(selectedOption);
    };

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className='mb-5 font-monospace'>
            <Container fluid>
                <Navbar.Brand href="#home">
                    <img src={Logo} alt={"Streamify"} width={55} className="d-inline-block me-2" />
                    Streamify
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-around'>
                    <Form className="d-flex">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">About</Nav.Link>
                            <NavDropdown title={dropdownTitle} id="basic-nav-dropdown" onSelect={handleClick}>
                                <NavDropdown.Item eventKey={1} href="#">Title</NavDropdown.Item>
                                <NavDropdown.Item eventKey={2} href="#">Genre</NavDropdown.Item>
                                <NavDropdown.Item eventKey={3} href="#">Rating</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="ms-2 me-2 rounded-pill border-0"
                            aria-label="Search"
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default StreamifyNavbar