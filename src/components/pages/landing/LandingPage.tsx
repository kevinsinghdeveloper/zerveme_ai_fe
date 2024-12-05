import React, {PropsWithChildren} from "react";
import AppHeader from '../../shared/header/AppHeader'
import {Route, Routes} from "react-router-dom";
import ContactUsPage from "../contactus/ContactUsPage";
import HomePage from "../HomePage/HomePage";
import AppFooter from "../../shared/footer/AppFooter";
import SubscribePage from "../subscribe/SubscribePage";
import ExplorePage from "../explore/ExplorePage";
import LoginPage from "../login/LoginPage";

export default function LandingPage(props: PropsWithChildren) {

    return (
        <>
            <AppHeader style={{width: '90%'}} className="ml-auto mr-auto mt-4 bg-inherit"/>
            <div style={{width: '90%'}} className="ml-auto mr-auto">
                <Routes>
                    <Route path="/contactus" element={<ContactUsPage/>}/>
                    <Route path="/subscribe" element={<SubscribePage/>}/>
                    <Route path="/explore" element={<ExplorePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="*" element={<HomePage/>}/>
                </Routes>
            </div>
            <AppFooter style={{width: '90%'}} className="ml-auto mr-auto mt-20 border-t-2"/>
        </>
    )
}