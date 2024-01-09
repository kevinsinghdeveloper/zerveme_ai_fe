import {PropsWithChildren} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

export default function AppHeader(props: PropsWithChildren) {
// TODO Add props to this so we can specify the stlyes below
    return (
        <header style={{width: '90%'}} className="ml-auto mr-auto">

            <Navbar expand="xl" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}