import {PropsWithChildren} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

export default function AppHeader(props: PropsWithChildren<{ className?: any, style?: any }>) {
    return (
        <header style={props.style} className={props.className}>

            <Navbar expand="xl">
                <Container fluid>
                    <Navbar.Brand href="/">ZerveMeData</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto text-xl">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/contactus">Contact Us</Nav.Link>
                            <Nav.Link href="/explore">Explore</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}