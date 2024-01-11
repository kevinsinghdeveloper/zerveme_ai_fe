import {PropsWithChildren, useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faPhone, faEarth, faRightToBracket} from '@fortawesome/free-solid-svg-icons'

export default function AppHeader(props: PropsWithChildren<{ className?: any, style?: any }>) {
    const [iconToShow, setIconToShow] = useState(null);

    const links = [
        {href: '/', text: 'Home', icon: faHome},
        {href: '/contactus', text: 'Contact Us', icon: faPhone},
        {href: '/explore', text: 'Explore', icon: faEarth},
        {href: '/account', text: 'Account', icon: faRightToBracket},
    ];

    const handleMouseOver = (icon: any) => {
        setIconToShow(icon);
    };

    const handleMouseOut = () => {
        setIconToShow(null);
    };

    return (
        <header style={props.style} className={props.className}>
            <Navbar expand="xl">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <section className="text-2xl">ZerveMeData</section>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto text-xl">
                            {links.map((link, index) => (
                                <Nav.Link
                                    key={index}
                                    href={link.href}
                                    onMouseOver={() => handleMouseOver(link.icon)}
                                    onMouseOut={handleMouseOut}
                                >
                                    {iconToShow === link.icon && <FontAwesomeIcon icon={iconToShow}/>} {link.text}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}