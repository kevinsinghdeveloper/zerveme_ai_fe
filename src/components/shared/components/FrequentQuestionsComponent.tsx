import React, {ReactElement, useState} from 'react';
import xmark from "../../../assets/xmark.png";
import {Col, Container, Image, Row} from "react-bootstrap";

interface FrequentQuestionsItemProps {
    question?: string;
    answer?: string;
}

interface FrequentQuestionsComponentProps {
    fa_questions?: { [key: number]: { question: string; answer: string } };
}

export function FrequentQuestionsItem({question, answer}: FrequentQuestionsItemProps) {
    const [isParagraphVisible, setIsParagraphVisible] = useState(true);

    const toggleParagraphVisibility = () => {
        setIsParagraphVisible(!isParagraphVisible);
    };
    return (
        <Row className="!mt-14">
            <Col lg={12} style={{position: "relative"}}>
                <Container fluid style={{
                    backgroundColor: "#110C15",
                    width: "70%",
                    borderRadius: "10px",
                    minHeight: "100px",
                    transition: "height 0.5s ease-in-out" // Add transition effect
                }} className="ml-auto mr-auto p-4 text-white">
                    <h3 className="ml-2 bg-inherit">Q.&nbsp;&nbsp;{question}</h3>
                    <p className={`ml-12 mr-12 mt-4 bg-inherit ${isParagraphVisible ? 'show' : 'hide'}`}
                       style={{wordWrap: "break-word"}}>
                        {answer}
                    </p>
                    <Image src={xmark} className="absolute"
                           style={{top: "3%", right: "16%", height: "20px"}}
                           onClick={toggleParagraphVisibility}/>
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
