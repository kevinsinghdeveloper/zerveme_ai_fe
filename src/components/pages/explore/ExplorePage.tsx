import React, {useState} from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./ExplorePageStyles.css";
import Dashboard from "../../shared/components/Dashboard";
import DashboardSidebar from "../../shared/components/DashboardSidebar";
import Projects from "../../shared/components/Projects";

const ExplorePage: React.FC = () => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [activeItem, setActiveItem] = useState('Dashboard');

    const handleSidebarToggle = () => {
        setOpenSidebar(!openSidebar);
    };

    const renderComponent = () => {
        console.log("Current activeItem:", activeItem);
        switch (activeItem) {
            case 'Dashboard':
                return <Dashboard />
            case 'Projects':
                return <Projects setActiveItem={setActiveItem} />;
            default:
                return <div>No matching component: {activeItem}</div>;
        }
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            {/* App Bar at the top */}
            <AppBar position="static">
                <Toolbar style={{backgroundColor: "#7b6df6"}}>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={handleSidebarToggle}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Content container as flex with no absolute positioning */}
            <Box sx={{display: 'flex', flexGrow: 1, overflow: 'hidden'}}>
                {/* Sidebar component */}
                <DashboardSidebar
                    open={openSidebar}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />

                {/* Dashboard component */}
                {renderComponent()}
            </Box>
        </Box>
    );
};

export default ExplorePage;