import {PropsWithChildren} from "react";
import {Col, Container, Row} from "react-bootstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import zervemelogo from "../../../assets/logo/zervemelogo.png";

import {faFacebookSquare, faTwitterSquare, faInstagramSquare, faLinkedin} from '@fortawesome/free-brands-svg-icons';

export default function AppFooter(props: PropsWithChildren<{ className?: any, style?: any }>) {
    return (
        <footer className={props.className} style={props.style}>
            <Container fluid className="p-2">
                <Row>
                    <Col md={4}>
                        <Container fluid className="text-white" style={{marginLeft: "20%"}}>
                            <img src={zervemelogo} alt="Zerveme Logo" className="pt-2"
                                 style={{width: '100px', height: 'auto'}}/>
                            <div className="mt-10">
                                <p>Copyright @2024 ZerveMe LLC.</p>
                                <span>
                                    <i className="pr-2"><FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon></i>
                                    <i className="pr-2"><FontAwesomeIcon icon={faTwitterSquare}></FontAwesomeIcon></i>
                                    <i className="pr-2"><FontAwesomeIcon icon={faInstagramSquare}></FontAwesomeIcon></i>
                                    <i className="pr-2"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></i>
                                </span>
                            </div>
                        </Container>
                    </Col>
                    <Col md={8} className="text-white">
                        <Row className="justify-content-end pb-4">
                            <Col xs={3} sm={3} md={3}>
                                <Row className="pt-2 pb-2 font-bold">About</Row>
                                <Row className="pt-2 font-thin">About us</Row>
                                <Row className="pt-2 font-thin">About Users</Row>
                            </Col>
                            <Col xs={3} sm={3} md={3}>
                                <Row className="pt-2 pb-2 font-bold">Links</Row>
                                <Row className="pt-2 font-thin">Home</Row>
                                <Row className="pt-2 font-thin">Explore</Row>
                                <Row className="pt-2 font-thin">Contact Us</Row>
                                <Row className="pt-2 font-thin">Subscribe</Row>
                            </Col>
                            <Col xs={3} sm={3} md={3}>
                                <Row className="pt-2 pb-2 font-bold">Support</Row>
                                <Row className="pt-2 font-thin">Contact Us</Row>
                                <Row className="pt-2 font-thin">Privacy & Policy</Row>
                                <Row className="pt-2 font-thin">Terms & Conditions</Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}