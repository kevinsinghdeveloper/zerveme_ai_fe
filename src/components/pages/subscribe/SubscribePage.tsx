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
import sub_bullet from "../../../assets/sub_bullet.png";
import * as url from "node:url";
import {FrequentQuestionsItem} from "../../shared/components/FrequentQuestionsComponent";

export default function SubscribePage(props: PropsWithChildren) {
    // Create a json map for the cards below. Separation into groups (border walls)
    // ^ eventually we can pull from somewhere

    const subscription_config = {
        4: {
            header_text: "Basic Plan",
            price_text: "$50",
            frequency_text: "month",
            bullet_points: {
                1: "50% off custom ETLs",
                2: "Deliverables",
                3: "Feature requests",
                4: "dssdfds",
                5: "sdfsdfsdf"
            },
            button_text: "",
            border_right: false,
        },
        2: {
            header_text: "Basic Plan",
            price_text: "$50",
            frequency_text: "month",
            bullet_points: {
                1: "50% off custom ETLs",
                2: "Deliverables",
                3: "Feature requests"
            },
            button_text: "",
            border_right: false,
        },
        3: {
            header_text: "Basic Plan",
            price_text: "$50",
            frequency_text: "month",
            bullet_points: {
                1: "50% off custom ETLs",
                2: "Deliverables",
                3: "Feature requests"
            },
            button_text: "",
            border_right: false,
        },
        1: {
            header_text: "Pay as you go",
            price_text: "Custom pricing",
            frequency_text: null,
            bullet_points: {
                1: "50% off custom ETLs",
                2: "Deliverables",
                3: "Feature requests"
            },
            button_text: "Choose plan",
            border_right: true,
        }
    }

    return (
        <Container fluid className="mt-12 mb-12" style={{width: '85%'}}>
            <Row>
                <h2 className="text-center text-white mb-20">Easy and affordable Pricing</h2>
            </Row>
            <Row>

                {subscription_config &&
                    Object.values(subscription_config).map((qna, index) => (
                        <Col md={3} style={qna.border_right ? {borderRight: '1px solid darkgray'} : {}}>
                            <Card className="w-82 h-100 ml-auto mr-auto text-white pl-8 pr-8 pt-2 pb-2"
                                  style={{backgroundColor: "#121418"}}>
                                <CardHeader style={{borderBottom: '1px solid darkgray'}}>
                                    <p className="bg-transparent">{qna.header_text}</p>
                                    <p className="bg-transparent"><h4
                                        className="bg-transparent">{qna.price_text} {qna.frequency_text &&
                                        <i className="font-light text-sm">/ {qna.frequency_text}</i>}</h4>
                                    </p>
                                </CardHeader>
                                <CardBody style={{backgroundColor: "#121418"}}>
                                    <CardText style={{backgroundColor: "#121418"}}>
                                        {qna.bullet_points &&
                                            Object.values(qna.bullet_points).map((qna, index) => (
                                                <li className="custom-bullet bg-transparent">{qna}</li>
                                            ))}
                                    </CardText>
                                    <Button style={{background: '#B660FE', width: "100%"}}>Choose Plan</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}

            </Row>
        </Container>
    )
}

/*
* <Col md={3}>
                    <Card className="w-82 h-100 ml-auto mr-auto text-white"
                          style={{backgroundColor: "#121418"}}>
                        <CardHeader>
                            <p className="bg-transparent">Basic Plan</p>
                            <p className="bg-transparent"><h2 className="bg-transparent">$50</h2></p>
                        </CardHeader>
                        <CardBody style={{backgroundColor: "#121418"}}>
                            <CardTitle style={{backgroundColor: "#121418"}}><b>Data
                                Orchestration</b></CardTitle>
                            <CardText style={{backgroundColor: "#121418"}}>
                                <li style={{listStyleImage: sub_bullet}>blah blah</li>
                                <li>blah blah</li>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
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
                <Col md={3}>
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
                </Col>*/