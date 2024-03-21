import React, {ReactElement, useState} from 'react';
import xmark from "../../../assets/xmark.png";
import {Col, Collapse, Container, Image, Row} from "react-bootstrap";

interface FrequentQuestionsItemProps {
    question?: string;
    answer?: string;
}

interface FrequentQuestionsComponentProps {
    fa_questions?: { [key: number]: { question: string; answer: string } };
}

export function FrequentQuestionsItem({question, answer}: FrequentQuestionsItemProps) {

    const [open, setOpen] = useState(true);

    return (
        <Row className="!mt-14">
            <Col lg={12} style={{position: "relative"}}>
                <Container fluid style={{
                    backgroundColor: "#110C15",
                    width: "70%",
                    borderRadius: "10px",
                    minHeight: "100px"
                }} className="ml-auto mr-auto p-4 text-white">
                    <h2>Q.&nbsp;&nbsp;{question}</h2>
                    <Collapse in={open}>
                        <p className="ml-12" style={{wordWrap: "break-word"}}>
                            {answer}
                        </p>
                    </Collapse>
                    <Image src={xmark} className="absolute"
                           style={{top: "3%", right: "16%", height: "20px", cursor: "pointer"}}
                           onClick={() => setOpen(!open)}/>
                </Container>
            </Col>
        </Row>
    )
}

export default function FrequentQuestionsComponent({fa_questions}: FrequentQuestionsComponentProps) {
    // You can use FrequentQuestionsItemComponent here like this:
    return (
        <div>
            <h2>Frequent Questions</h2>
            {fa_questions &&
                Object.values(fa_questions).map((qna, index) => (
                    <FrequentQuestionsItem key={index} question={qna.question} answer={qna.answer}/>
                ))}
        </div>
    );
}
