import {PropsWithChildren} from "react";
import {Col, Container, Row} from "react-bootstrap";

export default function HomePage(props: PropsWithChildren) {
    return (
        <Container fluid className="w-96">
            <Row className="py-4 py-xl-5">
                <Container fluid>
                    <Row className="bg-dark rounded border-0 border-dark overflow-hidden">
                        <Container className="p-0">
                            <Row>
                                <Col md={6} className="order-first">
                                    <div className="text-white p-4 p-md-5">
                                        <h2 className="fw-bold text-white m-3">Unleash Insights: Explore Fascinating
                                            Datasets on Our Platform</h2>
                                        <p className="m-3 text-lg">Welcome to our platform, where you can explore
                                            a
                                            wealth of
                                            fascinating datasets that will unlock a world of insights and possibilities!
                                            Our
                                            custom-built ELT/ETLs have transformed our data sets into something truly
                                            remarkable, providing you with a seamless and enjoyable data experience. And
                                            the
                                            best part? Our data sets are completely free to access and use! But that's
                                            not
                                            all - we also offer custom transformations and unlimited data exports to
                                            take
                                            your data analysis to the next level. So come and join us on an exhilarating
                                            journey of discovery, where every dataset is an opportunity to uncover
                                            something
                                            extraordinary.</p>
                                        <div className="my-3">
                                            {/* Your additional content goes here */}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="order-md-last">
                                    <div className="zoom">
                                        <img className="w-fit d-block" alt="error"
                                             src="https://cdn.pixabay.com/photo/2017/05/14/03/45/data-2311261_1280.png"/>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </Row>
            <section className="mt-20">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card w-100">
                                <div className="card-header bg-transparent border-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                         viewBox="0 0 16 16" className="bi bi-graph-up text-9xl">
                                        <path fill-rule="evenodd"
                                              d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"></path>
                                    </svg>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">Data Orchestration</h3>
                                    <p className="card-text">Converting data into something meaningful has always been
                                        the a complex topic for an organization. Having the best data strategy is
                                        important to take something that might not seem meaningful and deciphering it to
                                        extract key insights.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card w-100">
                                <div className="card-header bg-transparent border-0">
                                    <svg className="text-9xl" xmlns="http://www.w3.org/2000/svg" width="1em"
                                         height="1em" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M4 7V17C4 19.2091 7.58172 21 12 21C16.4183 21 20 19.2091 20 17V7M4 7C4 9.20914 7.58172 11 12 11C16.4183 11 20 9.20914 20 7M4 7C4 4.79086 7.58172 3 12 3C16.4183 3 20 4.79086 20 7M20 12C20 14.2091 16.4183 16 12 16C7.58172 16 4 14.2091 4 12"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">Data Architecture and Engineering</h3>
                                    <p className="card-text">Designing the best data models to effectively handle many
                                        different use cases and building out an ETL or ELT solution to transform and
                                        load data.&nbsp;<br/></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card w-100">
                                <div className="card-header bg-transparent border-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -64 640 640" width="1em"
                                         height="1em" fill="currentColor" className="text-9xl">
                                        <path
                                            d="M128 96h384v256h64V80C576 53.63 554.4 32 528 32h-416C85.63 32 64 53.63 64 80V352h64V96zM624 384h-608C7.25 384 0 391.3 0 400V416c0 35.25 28.75 64 64 64h512c35.25 0 64-28.75 64-64v-16C640 391.3 632.8 384 624 384zM365.9 286.2C369.8 290.1 374.9 292 380 292s10.23-1.938 14.14-5.844l48-48c7.812-7.813 7.812-20.5 0-28.31l-48-48c-7.812-7.813-20.47-7.813-28.28 0c-7.812 7.813-7.812 20.5 0 28.31l33.86 33.84l-33.86 33.84C358 265.7 358 278.4 365.9 286.2zM274.1 161.9c-7.812-7.813-20.47-7.813-28.28 0l-48 48c-7.812 7.813-7.812 20.5 0 28.31l48 48C249.8 290.1 254.9 292 260 292s10.23-1.938 14.14-5.844c7.812-7.813 7.812-20.5 0-28.31L240.3 224l33.86-33.84C281.1 182.4 281.1 169.7 274.1 161.9z"></path>
                                    </svg>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">Web API development</h3>
                                    <p className="card-text">APIs to retrieve / update data on a database</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}