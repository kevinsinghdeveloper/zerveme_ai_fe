import {PropsWithChildren} from "react";

export default function HomePage(props: PropsWithChildren) {
    return (
        <div>
            <section className="py-4 py-xl-5">
                <div className="container">
                    <div className="bg-dark border rounded border-0 border-dark overflow-hidden">
                        <div className="row g-0">
                            <div className="col-md-6">
                                <div className="text-white p-4 p-md-5">
                                    <h2 className="fw-bold text-white mb-3">Unleash Insights: Explore Fascinating
                                        Datasets on Our Platform</h2>
                                    <p className="mb-2">Welcome to our platform, where you can explore a wealth of
                                        fascinating datasets that will unlock a world of insights and possibilities!
                                        Our custom-built ELT/ETLs have transformed our data sets into something
                                        truly remarkable, providing you with a seamless and enjoyable data
                                        experience. And the best part? Our data sets are completely free to access
                                        and use! But that's not all - we also offer custom transformations and
                                        unlimited data exports to take your data analysis to the next level. So come
                                        and join us on an exhilarating journey of discovery, where every dataset is
                                        an opportunity to uncover something extraordinary.</p>
                                    <div className="my-3">

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 order-first order-md-last">
                                <div className="zoom">
                                    <img className="w-100 d-block" alt="error"
                                         src="https://cdn.pixabay.com/photo/2017/05/14/03/45/data-2311261_1280.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}