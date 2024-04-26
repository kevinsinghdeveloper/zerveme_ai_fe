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
    const fa_questions = {
        1: {
            question: "What is ETL?",
            answer: "ETL stands for Extract, Transform, Load. It refers to the process of extracting data from various sources, transforming it into a usable format, and loading it into a destination database or data warehouse."
        },
        2: {
            question: "What types of data sources can your ETL solution handle?",
            answer: "Our ETL solution can handle a wide range of data sources including relational databases, flat files (such as CSV, Excel), cloud storage (like Amazon S3, Google Cloud Storage), APIs, and streaming data."
        },
        3: {
            question: "How does your ETL solution ensure data quality?",
            answer: "We employ various techniques to ensure data quality including data profiling, cleansing, validation, and enrichment. Additionally, we provide monitoring and error handling mechanisms to identify and rectify any issues during the ETL process."
        },
        4: {
            question: "What scalability options does your ETL solution offer?",
            answer: "Our ETL solution is designed to scale horizontally and vertically based on the volume and complexity of data processing needs. It can seamlessly handle large volumes of data and accommodate increasing workload demands."
        },
        5: {
            question: "Can your ETL solution integrate with existing data systems?",
            answer: "Yes, our ETL solution is highly interoperable and can integrate with a wide range of existing data systems including data lakes, data warehouses, business intelligence tools, and enterprise applications. We provide flexible integration options to suit your specific requirements."
        },
        6: {
            question: "What analytics capabilities are available with your ETL environment?",
            answer: "Our ETL environment offers robust analytics capabilities including data visualization, reporting, ad-hoc querying, and predictive analytics. It empowers businesses to derive actionable insights from their transformed data for informed decision-making."
        }
    };


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
                                                <h1 className="text-white text-6xl">
                                                    Explore business data from <span
                                                    style={{color: '#B660FE'}}>Zerve Me Data</span>
                                                </h1>
                                                <p className="text-white">Zerve Me Data provides secure and reliable
                                                    Data For your business and information</p>

                                                <Button style={{background: '#B660FE'}}>Explore More</Button>
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
                            <Card className="w-75 h-100 ml-auto mr-auto text-white"
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
                            <Card className="w-75 h-100 ml-auto mr-auto text-white"
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
            </Row>
            <Row className="!mt-60">
                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            <Image src={previewexplorecomp} className="ml-auto mr-14"/>
                        </Col>
                        <Col sm={6}>
                            <p className="mr-auto ml-14 text-white">
                                <p className="text-4xl z-1">Explore ALL kinds of data</p>
                                <p className="z-1">So we are making it super simple to access any computer you want to
                                    get your work
                                    done at the most reasonable prices.</p>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row className="!mt-60">
                <FrequentQuestionsComponent fa_title="Frequenctly Asked Questions" fa_questions={fa_questions}/>
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