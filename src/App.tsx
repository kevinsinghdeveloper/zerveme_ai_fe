import './App.css';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import LandingPage from "./components/pages/landing/LandingPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ExplorerContextProvider} from "./components/context_providers/ExplorerContext";
import {AuthContextProvider, useAuthContext} from "./components/context_providers/AuthContext";
import {useContext} from "react";
import {UserContextProvider} from "./components/context_providers/UserContext";

export default function App() {
    return (
        <ErrorBoundary FallbackComponent={AppFallback}>
            <AuthContextProvider>
                <UserContextProvider>
                    <ExplorerContextProvider>
                        <BrowserRouter basename="/">
                            <Routes>
                                <Route path="*" element={<LandingPage/>}/>
                            </Routes>
                        </BrowserRouter>
                    </ExplorerContextProvider>
                </UserContextProvider>
            </AuthContextProvider>
        </ErrorBoundary>
    );
}


function AppFallback() {
    return (
        <div className="w-full h-full pt-48">
            <h1>The Explore App ran into an unexpected error!</h1>
        </div>
    )
}

function ProtectedRoute() {
    const {token} = useAuthContext();
    return token ? <Outlet/> : <Navigate to="/explore" replace/>;
}
