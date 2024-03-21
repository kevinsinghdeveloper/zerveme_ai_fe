import React, {ReactElement} from 'react';
import xmark from "../../../assets/xmark.png";
import {Col, Container, Image, Row} from "react-bootstrap";

interface FrequentQuestionsItemComponentProps {
    question?: string;
    answer?: string;
}

export function FrequentQuestionsItemComponent({question, answer}: FrequentQuestionsItemComponentProps) {
    return (
        <Row className="!mt-14">
            <Col lg={12} style={{position: "relative"}}>
                <Container fluid style={{
                    backgroundColor: "#110C15",
                    width: "70%",
                    borderRadius: "10px",
                    minHeight: "100px"
                }} className="ml-auto mr-auto p-4 text-white">
                    <h3 className="ml-2 bg-inherit">Q. {question}</h3>
                    <p className="ml-12 mr-12 mt-4 bg-inherit" style={{wordWrap: "break-word"}}>
                        {answer}
                    </p>
                    <Image src={xmark} className="absolute"
                           style={{top: "3%", right: "16%", height: "20px"}}/>
                </Container>
            </Col>
        </Row>
    )
}

export default function FrequentQuestionsComponent() {
    // You can use FrequentQuestionsItemComponent here like this:
    return (
        <p></p>
    )
}
