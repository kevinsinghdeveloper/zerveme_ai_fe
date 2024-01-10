import {PropsWithChildren} from "react";
import {Col, Container, Row} from "react-bootstrap";

export default function AppFooter(props: PropsWithChildren<{ className?: any, style?: any }>) {
    return (
        <footer className={props.className} style={props.style}>
            <Container fluid className="p-2">
                <Row>
                    <Col md={6}>
                        <p className="float-right">@ 2024 ZerveMeData</p>
                    </Col>
                    <Col md={6}>
                        <p>ZerveMeData.com</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}