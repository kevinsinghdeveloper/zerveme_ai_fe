import React, {PropsWithChildren, ReactElement} from "react";
import AppHeader from '../../shared/header/AppHeader'
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import ContactUsPage from "../contactus/ContactUsPage";
import HomePage from "../HomePage/HomePage";
import AppFooter from "../../shared/footer/AppFooter";
import SubscribePage from "../subscribe/SubscribePage";
import ExplorePage from "../explore/ExplorePage";
import LoginPage from "../login/LoginPage";
import ProfilePage from "../explore/profile/ProfilePage";
import {useAuthContext} from "../../context_providers/AuthContext";

function ProtectedRoute() {
    const {token, isLoading} = useAuthContext();

    // Show loading indicator while checking authentication
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // If no token is found, redirect to login
    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    // If token exists, render the child routes
    return <Outlet/>;
}

// Define proper interface for AuthenticatedRedirect props
interface AuthenticatedRedirectProps {
    element: ReactElement;
}

// Redirect to explore if authenticated
function AuthenticatedRedirect({element}: AuthenticatedRedirectProps) {
    const {token, isLoading} = useAuthContext();

    // Show loading indicator while checking authentication
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // If token exists, redirect to explore
    if (token) {
        console.log("User is authenticated, redirecting to explore");
        return <Navigate to="/explore" replace/>;
    }

    // Otherwise render the specified element
    return element;
}

export default function LandingPage(props: PropsWithChildren) {
    return (
        <>
            <AppHeader style={{width: '90%'}} className="ml-auto mr-auto mt-4 bg-inherit"/>
            <div style={{width: '100%'}} className="ml-auto mr-auto">
                <Routes>
                    <Route path="/contactus" element={<ContactUsPage/>}/>
                    <Route path="/subscribe" element={<SubscribePage/>}/>

                    {/* Protected routes - No auto redirect within these routes */}
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/explore" element={<ExplorePage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        {/* Add any other routes that require authentication */}
                    </Route>

                    {/* Routes that redirect authenticated users */}
                    <Route path="/login" element={<AuthenticatedRedirect element={<LoginPage/>}/>}/>
                    <Route path="/" element={<AuthenticatedRedirect element={<HomePage/>}/>}/>
                    <Route path="*" element={<HomePage/>}/>
                </Routes>
            </div>
            <AppFooter style={{width: '90%'}} className="ml-auto mr-auto mt-20 border-t-2"/>
        </>
    )
}