import React, {PropsWithChildren} from "react";
import AppHeader from '../../shared/header/AppHeader'
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import ContactUsPage from "../contactus/ContactUsPage";
import HomePage from "../HomePage/HomePage";
import AppFooter from "../../shared/footer/AppFooter";
import SubscribePage from "../subscribe/SubscribePage";
import ExplorePage from "../explore/ExplorePage";
import LoginPage from "../login/LoginPage";
import {useAuthContext} from "../../context_providers/AuthContext";

// Protected route component
function ProtectedRoute() {
    const {token} = useAuthContext();
    return token ? <Outlet/> : <Navigate to="/login" replace/>;
}

export default function LandingPage(props: PropsWithChildren) {
    return (
        <>
            <AppHeader style={{width: '90%'}} className="ml-auto mr-auto mt-4 bg-inherit"/>
            <div style={{width: '100%'}} className="ml-auto mr-auto">
                <Routes>
                    <Route path="/contactus" element={<ContactUsPage/>}/>
                    <Route path="/subscribe" element={<SubscribePage/>}/>

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/explore" element={<ExplorePage/>}/>
                        {/* Add any other routes that require authentication */}
                    </Route>

                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="*" element={<HomePage/>}/>
                </Routes>
            </div>
            <AppFooter style={{width: '90%'}} className="ml-auto mr-auto mt-20 border-t-2"/>
        </>
    )
}