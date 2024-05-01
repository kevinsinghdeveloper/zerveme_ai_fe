import React, {PropsWithChildren, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Col,
    Container,
    Form,
    Image,
    Row
} from "react-bootstrap";
import chat_zerveme from "../../../assets/chat_zerveme.png";
import chartpng from "../../../assets/chart.png";
import piechart from "../../../assets/pie_chart.png";


export default function SubscribePage(props: PropsWithChildren) {

    return (
        <Container fluid className="mt-10" style={{width: '80%'}}>
            <Row>
                <h2 className="text-center text-white mb-6">Easy and affordable Pricing</h2>
            </Row>
            <Row>
                <Col md={4}>
                    <Card className="w-82 h-100 ml-auto mr-auto text-white"
                          style={{backgroundColor: "#121418"}}>
                        <CardHeader className="bg-transparent border-0">
                            <Image style={{backgroundColor: "#121418"}} className="ml-auto mr-auto"
                                   src={chartpng}/>
                        </CardHeader>
                        <CardBody style={{backgroundColor: "#121418"}}>
                            <CardTitle style={{backgroundColor: "#121418"}}><b>Data
                                Orchestration</b></CardTitle>
                            <CardText style={{backgroundColor: "#121418"}}>Converting data into something
                                meaningful has always been
                                the a complex topic for an organization. Having the best data strategy is
                                important to take something that might not seem meaningful and deciphering it to
                                extract key insights.</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="w-82 h-100 ml-auto mr-auto text-white"
                          style={{backgroundColor: "#121418"}}>
                        <CardHeader className="bg-transparent border-0">
                            <Image style={{backgroundColor: "#121418"}} className="ml-auto mr-auto"
                                   src={piechart}/>
                        </CardHeader>
                        <CardBody style={{backgroundColor: "#121418"}}>
                            <CardTitle style={{backgroundColor: "#121418"}}><b>Data Architecture and
                                Engineering</b></CardTitle>
                            <CardText style={{backgroundColor: "#121418"}}>Designing the best data models to
                                effectively handle many
                                different use cases and building out an ETL or ELT solution to transform and
                                load data.&nbsp;<br/></CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="w-82 h-100 ml-auto mr-auto text-white"
                          style={{backgroundColor: "#121418"}}>
                        <CardHeader className="bg-transparent border-0">
                            <Image style={{backgroundColor: "#121418"}} className="ml-auto mr-auto"
                                   src={chartpng}/>
                        </CardHeader>
                        <CardBody style={{backgroundColor: "#121418"}}>
                            <CardTitle style={{backgroundColor: "#121418"}}><b>Web API
                                development</b></CardTitle>
                            <CardText style={{backgroundColor: "#121418"}}>APIs to retrieve / update data on a
                                database</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}