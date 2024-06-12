import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import LandingPage from "./components/pages/landing/LandingPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ExplorerContextProvider} from "./components/context_providers/ExplorerContext";

export default function App() {
    return (
        <ErrorBoundary FallbackComponent={AppFallback}>
            <ExplorerContextProvider>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="*" element={<LandingPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ExplorerContextProvider>
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
