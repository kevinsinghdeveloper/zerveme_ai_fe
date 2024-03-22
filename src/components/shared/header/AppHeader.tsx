import {PropsWithChildren, useState} from "react";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faPhone, faEarth, faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import zervemelogo from '../../../assets/logo/zervemelogo.png'

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
                        <Image src={zervemelogo} alt="Zerveme Logo" style={{width: '150px', height: 'auto'}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto text-xl">
                            {links.map((link, index) => (
                                <Nav.Link
                                    className="text-white p-1 mr-4"
                                    key={index}
                                    href={link.href}
                                    onMouseOver={() => handleMouseOver(link.icon)}
                                    onMouseOut={handleMouseOut}
                                >
                                    {iconToShow === link.icon && <FontAwesomeIcon icon={iconToShow}/>} {link.text}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <Button className="ml-8" style={{background: '#B660FE'}}>Explore Now!</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}