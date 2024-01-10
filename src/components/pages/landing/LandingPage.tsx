import React, {PropsWithChildren} from "react";
import AppHeader from '../../shared/header/AppHeader'
import {Route, Routes} from "react-router-dom";
import ContactUsPage from "../contactus/ContactUsPage";
import HomePage from "../HomePage/HomePage";

export default function LandingPage(props: PropsWithChildren) {
    return (
        <>
            <AppHeader style={{width: '90%'}} className="ml-auto mr-auto mt-4"></AppHeader>
            <body style={{width: '90%'}} className="ml-auto mr-auto">
            <Routes>
                <Route path="/contactus" element={<ContactUsPage/>}/>
                <Route path="*" element={<HomePage/>}/>
            </Routes>
            </body>
        </>
    )
}