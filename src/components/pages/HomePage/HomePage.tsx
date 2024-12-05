import React, {PropsWithChildren} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Col,
    Container, Image,
    Row
} from "react-bootstrap";

import previewdataexplore from '../../../assets/previewdataexplore.png'
import chartpng from '../../../assets/chart.png'
import piechart from '../../../assets/pie_chart.png'
import previewexplorecomp from '../../../assets/previewexplorecomp.png'
import FrequentQuestionsComponent from "../../shared/components/FrequentQuestionsComponent";

export default function HomePage(props: PropsWithChildren) {
    

    return (
        <Container fluid className="w-96">
            <Row className="py-4 py-xl-5">
                <Container fluid>
                    <Row className="rounded border-0 border-dark overflow-hidden">
                        <Container className="p-0">
                            <Row>
                                <Col lg={5} className="order-first p-0" style={{maxHeight: 700}}>
                                    <Container fluid>
                                        <Row className="h-100 align-items-center">
                                            <div className="h-100 pt-44">
                                                <h1 className="text-white text-5xl">
                                                    AI is the future of web discovery - it’s how customers find products
                                                    and services.<br/>
                                                    Let <span style={{color: '#B660FE'}}> ZerveMeData </span>
                                                    help you stand out.<br/><br/>Optimize your AI search ranking today.
                                                </h1>
                                                <Button style={{background: '#B660FE'}}>Join Now!</Button>
                                            </div>

                                        </Row>
                                    </Container>
                                </Col>
                                <Col lg={7} className="order-md-last p-0" style={{maxHeight: 700}}>
                                    <Container fluid>
                                        <Row className="h-100 align-items-center">
                                            <Col md={12}
                                                 className="text-center text-black rounded relative overflow-hidden"
                                                 style={{
                                                     height: '100vh',
                                                     width: '100%',
                                                 }}>
                                                <div className="position-absolute top-0 left-0 w-full h-full"
                                                     style={{
                                                         background: `url(${previewdataexplore}) center / contain no-repeat`,
                                                         height: '100%',
                                                         maxHeight: 700
                                                     }}>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </Row>
            <Row className="!mt-60">
                <Container fluid>
                    <Row>
                        <Col md={4}>
                            <Card className="w-75 h-100 ml-auto mr-auto text-white"
                                  style={{backgroundColor: "#121418"}}>
                                <CardHeader className="bg-transparent border-0">
                                    <Image style={{backgroundColor: "#121418"}} className="ml-auto mr-auto"
                                           src={chartpng}/>
                                </CardHeader>
                                <CardBody style={{backgroundColor: "#121418"}}>
                                    <CardTitle style={{backgroundColor: "#121418"}}><b>Competitor
                                        analysis</b></CardTitle>
                                    <CardText style={{backgroundColor: "#121418"}}>
                                        Analyze how competitors are doing, and how you can surpass them.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="w-75 h-100 ml-auto mr-auto text-white"
                                  style={{backgroundColor: "#121418"}}>
                                <CardHeader className="bg-transparent border-0">
                                    <Image style={{backgroundColor: "#121418"}} className="ml-auto mr-auto"
                                           src={piechart}/>
                                </CardHeader>
                                <CardBody style={{backgroundColor: "#121418"}}>
                                    <CardTitle style={{backgroundColor: "#121418"}}><b>AI Ranking score</b></CardTitle>
                                    <CardText style={{backgroundColor: "#121418"}}>Track your ranking over time, we pull
                                        data at any frequency you need. So you
                                        can see your progress daily, weekly, monthly, etc.<br/></CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="w-75 h-100 ml-auto mr-auto text-white"
                                  style={{backgroundColor: "#121418"}}>
                                <CardHeader className="bg-transparent border-0">
                                    <Image style={{backgroundColor: "#121418"}} className="ml-auto mr-auto"
                                           src={chartpng}/>
                                </CardHeader>
                                <CardBody style={{backgroundColor: "#121418"}}>
                                    <CardTitle style={{backgroundColor: "#121418"}}><b>Recommendations to
                                        improve</b></CardTitle>
                                    <CardText style={{backgroundColor: "#121418"}}>We will provided places where you can
                                        target to improve your AI score, including other items that will make a top
                                        player in your area.</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>

    )
}

/*
const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 500);
        });
    };
    <SpinnerWrapper fetchData={}></SpinnerWrapper>

 */