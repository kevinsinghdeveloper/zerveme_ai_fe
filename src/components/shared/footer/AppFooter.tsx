import {PropsWithChildren} from "react";
import {Col, Container, Row} from "react-bootstrap";
import zervemelogo from "../../../assets/logo/zervemelogo.png";
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faZ} from '@fortawesome/free-solid-svg-icons'

export default function AppFooter(props: PropsWithChildren<{ className?: any, style?: any }>) {
    return (
        <footer className={props.className} style={props.style}>
            <Container fluid className="p-2">
                <Row>
                    <Col md={4}>
                        <Container fluid>
                            <img src={zervemelogo} alt="Zerveme Logo" style={{width: '100px', height: 'auto'}}/>
                        </Container>
                    </Col>
                    <Col md={8} className="text-white">
                        <Row className="justify-content-end pb-4">
                            <Col md={3}>
                                <Row className="pt-2 pb-2 font-bold">About</Row>
                                <Row className="pt-2 font-thin">About us</Row>
                                <Row className="pt-2 font-thin">About Users</Row>
                            </Col>
                            <Col md={3}>
                                <Row className="pt-2 pb-2 font-bold">Links</Row>
                                <Row className="pt-2 font-thin">Home</Row>
                                <Row className="pt-2 font-thin">Explore</Row>
                                <Row className="pt-2 font-thin">Contact Us</Row>
                                <Row className="pt-2 font-thin">Subscribe</Row>
                            </Col>
                            <Col md={3}>
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