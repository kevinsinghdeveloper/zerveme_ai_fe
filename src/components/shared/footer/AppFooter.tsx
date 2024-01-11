import {PropsWithChildren} from "react";
import {Col, Container, Row} from "react-bootstrap";
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faZ} from '@fortawesome/free-solid-svg-icons'

export default function AppFooter(props: PropsWithChildren<{ className?: any, style?: any }>) {
    return (
        <footer className={props.className} style={props.style}>
            <Container fluid className="p-2">
                <Row>
                    <Col md={5}>
                        <p>@ 2024 ZerveMe</p>
                    </Col>
                    <Col md={2}>
                        <p className="text-center font-bold">
                            We Zerve
                            Data
                        </p>
                    </Col>
                    <Col md={5}>
                        <p className="float-right">ZerveMeData.com</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}