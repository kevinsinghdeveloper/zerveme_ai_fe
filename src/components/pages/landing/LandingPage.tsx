import React, {PropsWithChildren} from "react";
import AppHeader from '../../shared/header/AppHeader'
import {Route, Routes} from "react-router-dom";
import ContactUsPage from "../contactus/ContactUsPage";

export default function LandingPage(props: PropsWithChildren) {
    return (
        <>
            <AppHeader style={{width: '90%'}} className="ml-auto mr-auto"></AppHeader>
            <Routes>
                <Route path="/contactus" element={<ContactUsPage/>}/>
            </Routes>
        </>
    )
}