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
import Projects from "../../shared/components/Projects";
import { useExplorerContext } from '../../context_providers/ExplorerContext';

const ExplorePage: React.FC = () => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [activeItem, setActiveItem] = useState('Dashboard');
    const { focusedReport } = useExplorerContext();

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

    const renderComponent = () => {
        console.log("Current activeItem:", activeItem);
        switch (activeItem) {
            case 'Dashboard':
                return <Dashboard filters={filters}/>
            case 'Projects':
                return <Projects/>;
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
                        {focusedReport ? focusedReport.Name : 'Dashboard'}
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
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />

                {/* Dashboard component receiving filters */}
                {/*<Dashboard filters={filters}/>*/}
                {renderComponent()}
            </Box>
        </Box>
    );
};

export default ExplorePage;