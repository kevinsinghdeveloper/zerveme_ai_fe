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
import Sidebar from "../../shared/components/ReusableSidebar";
import Dashboard from "../../shared/components/Dashboard";
import DashboardSidebar from "../../shared/components/DashboardSidebar";

const ExplorePage: React.FC = () => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const expandedWidth = 240;
    const collapsedWidth = 64;

    // Filter state that will be shared between components
    const [filters, setFilters] = useState({
        dateRange: 'allTime',
        categories: [] as string[],
        region: 'all'
    });

    const handleSidebarToggle = () => {
        setOpenSidebar(!openSidebar);
    };

    const handleFilterChange = (filterName: string, value: any) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            {/* App Bar at the top */}
            <AppBar position="static">
                <Toolbar>
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
                {/* Sidebar component with filters */}
                <DashboardSidebar
                    open={openSidebar}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                {/* Dashboard component receiving filters */}
                <Dashboard filters={filters}/>
            </Box>
        </Box>
    );
};

export default ExplorePage;