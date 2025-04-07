import {PropsWithChildren} from "react";
import {Button, Container, Dropdown, Image, Nav, Navbar} from "react-bootstrap";
import {faPhone, faEarth, faReceipt} from '@fortawesome/free-solid-svg-icons'
import zervemelogo from '../../../assets/logo/zervemelogo.png'
import {useAuthContext} from "../../context_providers/AuthContext";

export default function AppHeader(props: PropsWithChildren<{ className?: any, style?: any }>) {
    const {token, userNameOrEmail, logout} = useAuthContext();

    const handleLogout = () => {
        logout(() => {
            window.location.href = '/'; // Redirect after logout
        });
    };

    let links = [
        //{href: '/', text: 'Home', icon: faHome},
        {href: '/contactus', text: 'Contact Us', icon: faPhone},
        {href: '/subscribe', text: 'Subscribe', icon: faReceipt},
    ];

    if (token) {
        links = [
            {href: '/support', text: 'Support', icon: faPhone},
            {href: '/models', text: 'Models', icon: faEarth}
        ]
    }

    return (
        <header style={props.style} className={props.className}>
            <Navbar expand="xl">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <Image src={zervemelogo} alt="Zerveme Logo" style={{width: '125px', height: 'auto'}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-between">
                        <Nav className="ml-5 text-xl">
                            {links.map((link, index) => (
                                <Nav.Link
                                    className="text-white p-1 mr-4"
                                    key={index}
                                    href={link.href}
                                >
                                    {link.text}
                                </Nav.Link>
                            ))}
                        </Nav>
                        {token == null ? (
                            <>
                                <Button className="ml-auto" style={{background: '#B660FE'}}
                                        href="/subscribe">Register!</Button>
                                <Button className="ml-2" style={{background: '#7b6df6'}} href="/login">Login!</Button>
                            </>
                        ) : (
                            <Dropdown className="ml-auto">
                                <Dropdown.Toggle style={{background: '#7b6df6'}} id="dropdown-basic">
                                    {userNameOrEmail ? userNameOrEmail : "Login"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}