import { PropsWithChildren } from "react";


export default function AppHeader(props: PropsWithChildren) {

    return (
        <header>

            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white">
                <div className="container">
                    <a className="navbar-brand" href="#">

                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >Explore Data</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >News</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >Contact Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-link font-weight-bold">Subscription</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link font-weight-bold px-3 py-2 rounded" >Account</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </header>
    )
}