import React, {PropsWithChildren, useState} from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Container,
    Grid,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./ExplorePageStyles.css"
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Chart} from "react-chartjs-2";
import 'chart.js/auto'; // ADD THIS

export default function ExplorePage(props: PropsWithChildren) {
    const [openSidebar, setOpenSidebar] = useState(true);
    const expandedWidth = 240;
    const collapsedWidth = 64;

    const handleSidebarToggle = () => {
        setOpenSidebar(!openSidebar);
    };

    // Sample chart data
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };


    // Sidebar menu items with icons and labels
    const menuItems = [
        {icon: <DashboardIcon/>, text: 'Dashboard'},
        {icon: <BarChartIcon/>, text: 'Charts'},
        {icon: <TableChartIcon/>, text: 'Tables'}
    ];

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
                {/* Sidebar with variable width */}
                <Box
                    sx={{
                        width: openSidebar ? expandedWidth : collapsedWidth,
                        height: '100%',
                        backgroundColor: 'background.paper',
                        borderRight: 1,
                        borderColor: 'divider',
                        transition: 'width 0.3s ease',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        flexShrink: 0 // Prevent sidebar from shrinking
                    }}
                >
                    <List>
                        <ListItem sx={{justifyContent: openSidebar ? 'flex-start' : 'center'}}>
                            {openSidebar ? (
                                <Typography variant="h6">Menu</Typography>
                            ) : (
                                <Typography variant="h6" sx={{fontSize: '1.5rem'}}>M</Typography>
                            )}
                        </ListItem>
                        <Divider/>
                        {menuItems.map((item, index) => (
                            <Tooltip
                                key={index}
                                title={!openSidebar ? item.text : ''}
                                placement="right"
                                disableHoverListener={openSidebar}
                            >
                                <ListItem
                                    button
                                    sx={{
                                        justifyContent: openSidebar ? 'flex-start' : 'center',
                                        px: openSidebar ? 2 : 1
                                    }}
                                >
                                    <ListItemIcon sx={{minWidth: openSidebar ? 36 : 24, justifyContent: 'center'}}>
                                        {item.icon}
                                    </ListItemIcon>
                                    {openSidebar && <ListItemText primary={item.text}/>}
                                </ListItem>
                            </Tooltip>
                        ))}
                    </List>
                </Box>

                {/* Main Content - Flexibly takes remaining space */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        overflow: 'auto',
                        transition: 'margin-left 0.3s ease'
                    }}
                >
                    <Container maxWidth={false} sx={{maxWidth: '100%'}}>  {/* Remove default max-width constraints */}
                        <Grid container spacing={2}>
                            {/* These cards will adjust based on screen size:
            - On extra small screens (xs): 1 card per row (12/12)
            - On small screens (sm): 2 cards per row (6/12)
            - On medium screens (md): 3 cards per row (4/12)
            - On large screens (lg): 4 cards per row (3/12)
            - On extra large screens (xl): 6 cards per row (2/12) */}

                            {/* Big card - twice as wide at every breakpoint */}
                            <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                                <Card sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography variant="h6" sx={{mb: 2}}>Sales Overview Dashboard</Typography>
                                    <Box sx={{flexGrow: 1, minHeight: {xs: '250px', md: '200px'}}}>
                                        <Chart type="bar" data={data}/>
                                    </Box>
                                </Card>
                            </Grid>

                            {/* Regular sized cards */}
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography variant="h6" sx={{mb: 2}}>Sales Table</Typography>
                                    <Box sx={{flexGrow: 1, overflow: 'auto'}}>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Month</TableCell>
                                                    <TableCell>Sales</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.labels.map((month, index) => (
                                                    <TableRow key={month}>
                                                        <TableCell>{month}</TableCell>
                                                        <TableCell>{data.datasets[0].data[index]}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={12} lg={10} xl={6}>
                                <Card sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography variant="h6" sx={{mb: 2}}>Monthly Trends</Typography>
                                    <Box sx={{flexGrow: 1}}>
                                        <Chart type="line" data={data}/>
                                    </Box>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography variant="h6" sx={{mb: 2}}>Categories</Typography>
                                    <Box sx={{flexGrow: 1}}>
                                        <Chart type="pie" data={{
                                            labels: ['Electronics', 'Clothing', 'Food', 'Books'],
                                            datasets: [{
                                                data: [30, 25, 20, 25],
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.6)',
                                                    'rgba(54, 162, 235, 0.6)',
                                                    'rgba(255, 206, 86, 0.6)',
                                                    'rgba(75, 192, 192, 0.6)',
                                                ]
                                            }]
                                        }}/>
                                    </Box>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography variant="h6" sx={{mb: 2}}>Performance</Typography>
                                    <Box sx={{flexGrow: 1}}>
                                        <Chart type="doughnut" data={{
                                            labels: ['Target', 'Actual'],
                                            datasets: [{
                                                data: [65, 35],
                                                backgroundColor: [
                                                    'rgba(54, 162, 235, 0.6)',
                                                    'rgba(255, 99, 132, 0.6)',
                                                ]
                                            }]
                                        }}/>
                                    </Box>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography variant="h6" sx={{mb: 2}}>Regional Data</Typography>
                                    <Box sx={{flexGrow: 1}}>
                                        <Chart type="radar" data={{
                                            labels: ['North', 'East', 'South', 'West', 'Central'],
                                            datasets: [{
                                                label: 'Sales',
                                                data: [65, 59, 90, 81, 56],
                                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                                borderColor: 'rgba(54, 162, 235, 1)',
                                                borderWidth: 1
                                            }]
                                        }}/>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}